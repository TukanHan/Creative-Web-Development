import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Renderer, Geometry, Program, Mesh } from 'ogl';

import vertexShader from './shaders/vertex-shader.vert.glsl';
import fragmentShader from './shaders/fragment-shader.frag.glsl';
import { getCurl2D } from './curl-noise';

@Component({
    selector: 'app-boids-page',
    imports: [],
    template: `<canvas #canvas></canvas>`,
    styles: `
        :host {
            display: flex;
            height: 100vh;
            width: 100vw;
            background: radial-gradient(circle, #101014 0%, #121212 100%);
            overflow: hidden;
        }
        canvas {
            width: 100%;
            height: 100%;
            display: block;
        }
    `,
    host: {
        '(window:resize)': 'onResize()',
    },
})
export class BoidsPage implements AfterViewInit, OnDestroy {
    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private program!: Program;
    private mesh!: Mesh;
    private animationFrameId = 0;

    private readonly GRID_SPACING = 20;
    private particleCount = 0;
    private positions!: Float32Array;
    private resolution = new Float32Array([1, 1]);

    private angles!: Float32Array;
    private lengths!: Float32Array;
    private rows: number = 0;
    private cols: number = 0;

    public ngAfterViewInit(): void {
        this.initOGL();
        this.onResize();
        this.animate(0);
    }

    protected onResize(): void {
        const canvas = this.canvasRef().nativeElement;
        const parent = canvas.parentElement;
        if (!parent) {
            return;
        }

        const width = parent.clientWidth;
        const height = parent.clientHeight;

        if (width === 0 || height === 0) {
            return;
        }

        this.renderer.setSize(width, height);
        this.resolution[0] = width;
        this.resolution[1] = height;

        this.updateGrid(width, height);
    }

    private initOGL(): void {
        const canvas = this.canvasRef().nativeElement;

        this.renderer = new Renderer({
            canvas,
            antialias: true,
            alpha: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2),
        });

        const gl = this.renderer.gl;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        this.program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uResolution: { value: this.resolution },
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, {
            mode: gl.POINTS,
            program: this.program,
            geometry: new Geometry(gl, {
                position: { size: 2, data: new Float32Array(0) },
            }),
        });
    }

    private updateGrid(width: number, height: number): void {
        const gl = this.renderer.gl;

        this.cols = Math.floor(width / this.GRID_SPACING);
        this.rows = Math.floor(height / this.GRID_SPACING);

        if (this.cols <= 0 || this.rows <= 0) {
            return;
        }

        const startX = (width - (this.cols - 1) * this.GRID_SPACING) / 2;
        const startY = (height - (this.rows - 1) * this.GRID_SPACING) / 2;

        this.particleCount = this.cols * this.rows;
        this.positions = new Float32Array(this.particleCount * 2);
        this.angles = new Float32Array(this.particleCount);
        this.lengths = new Float32Array(this.particleCount);

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

        this.mesh.geometry = new Geometry(gl, {
            position: { size: 2, data: this.positions },
            aAngle: { size: 1, data: this.angles },
            aLength: { size: 1, data: this.lengths },
        });
    }

    private readonly animate = (time: number): void => {
        this.animationFrameId = requestAnimationFrame(this.animate);

        const t = time * 0.0001;

        let idx = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const posX = this.positions[idx * 2];
                const posY = this.positions[idx * 2 + 1];

                const curl = getCurl2D(posX, posY, t);

                this.angles[idx] = Math.atan2(curl.vy, curl.vx);
                this.lengths[idx] = Math.hypot(curl.vx, curl.vy);

                idx++;
            }
        }

        this.mesh.geometry.attributes['aAngle'].needsUpdate = true;
        this.mesh.geometry.attributes['aLength'].needsUpdate = true;

        this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT);
        this.renderer.render({ scene: this.mesh });
    };

    public ngOnDestroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}
