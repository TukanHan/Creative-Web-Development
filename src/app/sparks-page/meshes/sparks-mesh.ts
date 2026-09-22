import { Geometry, Mesh, OGLRenderingContext, Program, Vec2 } from 'ogl';

import vertexShader from '../shaders/sparks.vert.glsl';
import fragmentShader from '../shaders/sparks.frag.glsl';
import { Spark } from './spark';
import { Viewport2D } from '../mesh-frame/viewport-2d';
import { MeshController } from './mesh-controler.interface';
import { MeshFrame } from '../mesh-frame/mesh-frame';
import { Size } from '../mesh-frame/size';

export class SparksMesh implements MeshController {
    private mesh!: Mesh;
    private program!: Program;

    private readonly timeUniform = { value: 0 };
    private readonly resolutionUniform = { value: new Float32Array([1, 1]) };

    private positions!: Float32Array;
    private velocities!: Float32Array;
    private ids!: Float32Array;
    private angers!: Float32Array;

    private readonly sparks: Spark[] = [];

    constructor(private readonly viewport: Viewport2D) {}

    public init(gl: OGLRenderingContext, size: Size): void {
        this.program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uResolution: this.resolutionUniform,
                uTime: this.timeUniform,
            },
            transparent: true,
            depthTest: false,
        });

        this.mesh = new Mesh(gl, {
            mode: gl.POINTS,
            program: this.program,
            geometry: new Geometry(gl),
        });

        this.initSparks(size);
    }

    private initSparks(size: Size): void {
        const gridDensity = 15;

        const cols = Math.floor((size.width * 1.3) / gridDensity);
        const rows = Math.floor((size.height * 1.3) / gridDensity);

        const startX = (this.viewport.size.width - (cols - 1) * gridDensity) / 2;
        const startY = (this.viewport.size.height - (rows - 1) * gridDensity) / 2;

        const totalSparks = cols * rows;

        this.positions = new Float32Array(totalSparks * 2);
        this.velocities = new Float32Array(totalSparks * 2);
        this.angers = new Float32Array(totalSparks);
        this.ids = Float32Array.from({ length: totalSparks }, (_, i) => i);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const offsetX = (Math.random() - 0.5) * 2 * gridDensity;
                const offsetY = (Math.random() - 0.5) * 2 * gridDensity;

                const x = startX + col * gridDensity + offsetX;
                const y = startY + row * gridDensity + offsetY;

                this.sparks.push(new Spark(new Vec2(x, y)));
            }
        }
    }

    public resize(): void {
        this.resolutionUniform.value[0] = this.viewport.size.width;
        this.resolutionUniform.value[1] = this.viewport.size.height;

        this.mesh.geometry = new Geometry(this.mesh.gl, {
            aPosition: { size: 2, data: this.positions },
            aVelocity: { size: 2, data: this.velocities },
            aID: { size: 1, data: this.ids },
            aAnger: { size: 1, data: this.angers },
        });
    }

    public update(frame: MeshFrame): Mesh {
        this.timeUniform.value = frame.clock.time;

        for (let idx = 0; idx < this.sparks.length; idx++) {
            const spark = this.sparks[idx];
            spark.update(frame.clock, frame.mouse);

            const cameraPos = this.viewport.worldToNdc(spark.position);
            this.positions[idx * 2] = cameraPos.x;
            this.positions[idx * 2 + 1] = cameraPos.y;

            this.velocities[idx * 2] = spark.velocity.x;
            this.velocities[idx * 2 + 1] = spark.velocity.y;

            this.angers[idx] = spark.anger;
        }

        this.mesh.geometry.attributes['aVelocity'].needsUpdate = true;
        this.mesh.geometry.attributes['aPosition'].needsUpdate = true;
        this.mesh.geometry.attributes['aAnger'].needsUpdate = true;

        return this.mesh;
    }
}
