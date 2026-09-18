import { Geometry, Mesh, OGLRenderingContext, Program, Vec2 } from 'ogl';

import vertexShader from '../shaders/boids.vert.glsl';
import fragmentShader from '../shaders/boids.frag.glsl';
import { Boid } from './boid';
import { Viewport2D } from '../viewport-2d';
import { MeshController } from './mesh-controler.interface';
import { MeshFrame } from '../mesh-frame/mesh-frame';

export class BoidsMesh implements MeshController {
    private mesh!: Mesh;
    private program!: Program;

    private resolution = new Float32Array([1, 1]);

    private positions!: Float32Array;
    private velocities!: Float32Array;

    private readonly boids: Boid[] = [];

    constructor(private readonly viewport: Viewport2D) {}

    public init(gl: OGLRenderingContext): void {
        this.program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uResolution: { value: this.resolution },
                uTime: { value: 0 },
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, {
            mode: gl.POINTS,
            program: this.program,
            geometry: new Geometry(gl),
        });

        this.initBoids();
    }

    private initBoids(): void {
        for (let i = -50; i < 50; i++) {
            for (let j = -20; j < 20; j++) {
                const pos = new Vec2(i * 15, j * 15);
                this.boids.push(new Boid(pos));
            }
        }

        this.positions = new Float32Array(this.boids.length * 2);
        this.velocities = new Float32Array(this.boids.length * 2);
    }

    public resize(): void {
        this.resolution[0] = this.viewport.width;
        this.resolution[1] = this.viewport.height;

        this.mesh.geometry = new Geometry(this.mesh.gl, {
            aPosition: { size: 2, data: this.positions },
            aVelocity: { size: 2, data: this.velocities },
        });
    }

    public update(frame: MeshFrame): Mesh {
        this.program.uniforms['uTime'].value = frame.clock.time;

        for (let idx = 0; idx < this.boids.length; idx++) {
            const boid = this.boids[idx];
            boid.update(frame.clock, frame.mousePosition);

            const cameraPos = this.viewport.worldToNdc(boid.position);
            this.positions[idx * 2] = cameraPos.x;
            this.positions[idx * 2 + 1] = cameraPos.y;

            this.velocities[idx * 2] = boid.velocity.x;
            this.velocities[idx * 2 + 1] = boid.velocity.y;
        }

        this.mesh.geometry.attributes['aVelocity'].needsUpdate = true;
        this.mesh.geometry.attributes['aPosition'].needsUpdate = true;

        return this.mesh;
    }
}
