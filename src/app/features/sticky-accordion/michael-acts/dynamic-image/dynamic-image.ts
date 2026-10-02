import {
    Component,
    ElementRef,
    input,
    OnDestroy,
    OnInit,
    viewChild,
} from '@angular/core';
import { Geometry, Mesh, Program, Renderer, Texture } from 'ogl';

import vertexShader from '../../../../core/shaders/shape.vert.glsl';
import fragmentShader from './dynamic-image.frag.glsl';

@Component({
    selector: 'app-dynamic-image',
    standalone: true,
    template: `<canvas #canvas></canvas>`,
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;
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
export class DynamicImage implements OnInit, OnDestroy {
    public readonly src = input.required<string>();
    public readonly progress = input.required<number>();

    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private program!: Program;
    private mesh!: Mesh;
    private texture!: Texture;
    private animationFrameId!: number;
    private previousFrameTime?: number;

    private currentProgress = 0;

    private readonly timeUniform = { value: 0 };
    private readonly resolutionUniform = { value: new Float32Array(2) };
    private readonly progressUniform = { value: 0 };
    private readonly imageResolutionUniform = { value: new Float32Array([1, 1]) };

    public ngOnInit(): void {
        this.initRenderer();
        this.loadImage(this.src());
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

        // Geometria pełnoekranowa (Triangle clip-space)
        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        this.texture = new Texture(gl, {
            generateMipmaps: false,
        });

        this.program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTexture: { value: this.texture },
                uTime: this.timeUniform,
                uResolution: this.resolutionUniform,
                uImageResolution: this.imageResolutionUniform,
                uProgress: this.progressUniform,
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, { geometry, program: this.program });
    }

    private loadImage(url: string): void {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        img.onload = () => {
            this.texture.image = img;
            this.imageResolutionUniform.value[0] = img.naturalWidth;
            this.imageResolutionUniform.value[1] = img.naturalHeight;
        };
    }

    private readonly animate = (time: number): void => {
        const deltaTime = Math.min((time - (this.previousFrameTime ?? time)) * 0.001, 0.05);
        this.previousFrameTime = time;

        // Płynna interpolacja wartości progressu
        this.currentProgress += (this.progress() - this.currentProgress) * 0.05;

        this.timeUniform.value += deltaTime;
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