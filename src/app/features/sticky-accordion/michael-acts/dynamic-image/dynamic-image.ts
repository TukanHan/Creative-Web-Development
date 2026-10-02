import {
    Component,
    effect,
    ElementRef,
    input,
    OnDestroy,
    OnInit,
    viewChild,
} from '@angular/core';
import { Geometry, Mesh, Program, Renderer, Texture } from 'ogl';

import vertexShader from '../../../../core/shaders/shape.vert.glsl';
import storyFragmentShader from './dynamic-image.frag.glsl';
import { ImageTransitionPass } from './image-transition-pass';

@Component({
    selector: 'app-dynamic-image',
    standalone: true,
    template: `<canvas #canvas></canvas>`,
    styles: `
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
export class DynamicImage implements OnInit, OnDestroy {
    public readonly currentSrc = input.required<string>();
    public readonly prevSrc = input.required<string>();
    public readonly progress = input.required<number>();

    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private transitionPass!: ImageTransitionPass;
    private storyEffect!: Mesh;
    private readonly storyUniforms = {
        uTexture: { value: null as Texture | null },
        uTime: { value: 0 },
        uProgress: { value: 0 },
    };
    private animationFrameId!: number;
    private previousFrameTime?: number;
    private currentProgress = 0;

    private readonly sourceChange = effect(() => {
        this.transitionPass.setSources(this.prevSrc(), this.currentSrc());
    });

    public ngOnInit(): void {
        this.initRenderer();
        this.transitionPass.setSources(this.prevSrc(), this.currentSrc());
        this.resize();
        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    private initRenderer(): void {
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

        this.transitionPass = new ImageTransitionPass(this.renderer, geometry);
        this.storyEffect = new Mesh(gl, {
            geometry,
            program: new Program(gl, {
                vertex: vertexShader,
                fragment: storyFragmentShader,
                uniforms: this.storyUniforms,
                transparent: true,
            }),
        });
    }

    private readonly animate = (time: number): void => {
        const deltaTime = Math.min((time - (this.previousFrameTime ?? time)) * 0.001, 0.05);
        this.previousFrameTime = time;

        this.currentProgress += (this.progress() - this.currentProgress) * 0.05;
        this.transitionPass.render(time);
        this.storyUniforms.uTexture.value = this.transitionPass.texture;
        this.storyUniforms.uTime.value += deltaTime;
        this.storyUniforms.uProgress.value = this.currentProgress;
        this.renderer.render({ scene: this.storyEffect });
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    protected resize(): void {
        const canvas = this.canvasRef().nativeElement;
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;

        this.renderer.setSize(width, height);

        const gl = this.renderer.gl;
        this.transitionPass.resize(gl.canvas.width, gl.canvas.height);
    }

    public ngOnDestroy(): void {
        cancelAnimationFrame(this.animationFrameId);
    }
}