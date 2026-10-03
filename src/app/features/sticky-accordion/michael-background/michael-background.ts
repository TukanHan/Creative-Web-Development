import {
    afterNextRender,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    input,
    viewChild,
} from '@angular/core';
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
export class MichaelBackground {
    public readonly progress = input.required<number>();
    private readonly destroyRef = inject(DestroyRef);

    private currentProgress = 0;

    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private geometry!: Geometry;
    private program!: Program;
    private mesh!: Mesh;
    private animationFrameId!: number;
    private previousFrameTime?: number;

    private readonly timeUniform = { value: 0 };
    private readonly resolutionUniform = { value: new Float32Array(2) };
    private readonly progressUniform = { value: 0 };

    constructor() {
        afterNextRender(() => {
            this.initRenderer();
            this.resize();
            this.animationFrameId = requestAnimationFrame(this.animate);
        });

        this.destroyRef.onDestroy(() => this.dispose());
    }

    private initRenderer(): void {
        const canvas = this.canvasRef().nativeElement;

        this.renderer = new Renderer({
            canvas,
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true,
        });
        const gl = this.renderer.gl;

        this.geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        this.program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: this.timeUniform,
                uResolution: this.resolutionUniform,
                uProgress: this.progressUniform,
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, { geometry: this.geometry, program: this.program });
    }

    private readonly animate = (time: number): void => {
        const deltaTime = Math.min((time - (this.previousFrameTime ?? time)) * 0.001, 0.05);
        this.previousFrameTime = time;

        this.currentProgress += (this.progress() - this.currentProgress) * 0.01;
        const tension = Math.pow(1 - this.currentProgress, 1.3);
        this.timeUniform.value += deltaTime * (0.3 + 0.5 * tension);
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

    private dispose(): void {
        cancelAnimationFrame(this.animationFrameId);
        this.geometry.remove();
        this.program.remove();
    }
}
