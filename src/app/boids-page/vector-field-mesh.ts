import { Geometry, Mesh, OGLRenderingContext, Program } from 'ogl';

import vertexShader from './shaders/vector-field.vert.glsl';
import fragmentShader from './shaders/vector-field.frag.glsl';
import { getCurl2D } from '../core/noise/curl-noise';

export class VectorFieldMesh {
    private mesh!: Mesh;

    private readonly GRID_SPACING = 15;
    private resolution = new Float32Array([1, 1]);

    private positions!: Float32Array;
    private angles!: Float32Array;
    private lengths!: Float32Array;
    private rows: number = 0;
    private cols: number = 0;

    public init(gl: OGLRenderingContext): void {
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uResolution: { value: this.resolution },
            },
            transparent: true,
            cullFace: null,
        });

        this.mesh = new Mesh(gl, {
            mode: gl.POINTS,
            program: program,
            geometry: new Geometry(gl, {
                position: { size: 2, data: new Float32Array(0) },
            }),
        });
    }

    public resize(width: number, height: number): void {
        this.resolution[0] = width;
        this.resolution[1] = height;

        this.cols = Math.floor(width / this.GRID_SPACING);
        this.rows = Math.floor(height / this.GRID_SPACING);

        if (this.cols <= 0 || this.rows <= 0) {
            return;
        }

        const startX = (width - (this.cols - 1) * this.GRID_SPACING) / 2;
        const startY = (height - (this.rows - 1) * this.GRID_SPACING) / 2;

        const particleCount = this.cols * this.rows;
        this.positions = new Float32Array(particleCount * 2);
        this.angles = new Float32Array(particleCount);
        this.lengths = new Float32Array(particleCount);

        let idx = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const posX = startX + c * this.GRID_SPACING;
                const posY = startY + r * this.GRID_SPACING;

                this.positions[idx * 2] = posX;
                this.positions[idx * 2 + 1] = posY;

                idx++;
            }
        }

        this.mesh.geometry = new Geometry(this.mesh.gl, {
            position: { size: 2, data: this.positions },
            aAngle: { size: 1, data: this.angles },
            aLength: { size: 1, data: this.lengths },
        });
    }

    public update(time: number): Mesh {
        let idx = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const posX = this.positions[idx * 2];
                const posY = this.positions[idx * 2 + 1];

                const curl = getCurl2D(posX, posY, time);

                this.angles[idx] = Math.atan2(curl.vy, curl.vx);
                this.lengths[idx] = Math.hypot(curl.vx, curl.vy);

                idx++;
            }
        }

        this.mesh.geometry.attributes['aAngle'].needsUpdate = true;
        this.mesh.geometry.attributes['aLength'].needsUpdate = true;

        return this.mesh;
    }
}
