import { Component, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Geometry, Mesh, Program, Renderer } from 'ogl';

import vertexShader from '../../../core/shaders/shape.vert.glsl';
import fragmentShader from './smoke.frag.glsl';

@Component({
    selector: 'app-michael-background',
    template: `<canvas #canvas></canvas>`,
    styles: `
        :host {
            width: 100%;
            height: 100%;
            position: fixed;
        }
        canvas {
            width: 100% !important;
            height: 100% !important;
            display: block;
        }
    `,
    host: {
        '(window:resize)': 'resize()',
    },
})
export class MichaelBackground implements OnInit, OnDestroy {
    public readonly progress = input.required<number>();
    private currentProgress = 0;

    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private program!: Program;
    private mesh!: Mesh;
    private animationFrameId!: number;

    private readonly timeUniform = { value: 0 };
    private readonly resolutionUniform = { value: new Float32Array(2) };
    private readonly progressUniform = { value: 0 };

    public ngOnInit(): void {
        const canvas = this.canvasRef().nativeElement;

        this.renderer = new Renderer({
            canvas,
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true,
        });
        const gl = this.renderer.gl;

        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        this.program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: this.timeUniform,
                uResolution: this.resolutionUniform,
                uProgress: this.progressUniform
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, { geometry, program: this.program });

        this.resize();
        this.animate(0);
    }

    private readonly animate = (time: number): void => {
        this.timeUniform.value = time * 0.001;

        this.currentProgress += (this.progress() - this.currentProgress) * 0.01; 
        this.progressUniform.value = this.currentProgress;

        this.renderer.render({ scene: this.mesh });
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    protected resize(): void {
        const canvas = this.canvasRef().nativeElement;
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;

        this.renderer.setSize(width, height);

        const gl = this.renderer.gl;
        this.resolutionUniform.value[0] = gl.canvas.width;
        this.resolutionUniform.value[1] = gl.canvas.height;
    }

    public ngOnDestroy(): void {
        cancelAnimationFrame(this.animationFrameId);
    }
}
