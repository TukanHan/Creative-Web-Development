import { Component, effect, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Renderer, Geometry, Program, Mesh } from 'ogl';

import vertexShader from './shaders/shape.vert.glsl';

@Component({
    selector: 'app-shader-preview',
    template: `<canvas #canvas></canvas>`,
    styles: `
        :host {
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
export class ShaderPreview implements OnInit, OnDestroy {
    public readonly fragmentShader = input.required<string>();

    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private program!: Program;
    private mesh!: Mesh;
    private animationFrameId!: number;

    private timeOffset = 0;

    private readonly timeUniform = { value: 0 };
    private readonly resolutionUniform = { value: new Float32Array(2) };

    private readonly updateShader = effect(() => {
        this.program.setShaders({ vertex: vertexShader, fragment: this.fragmentShader() });
        this.timeOffset = performance.now();
    });

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
            fragment: this.fragmentShader(),
            uniforms: {
                uTime: this.timeUniform,
                uResolution: this.resolutionUniform,
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, { geometry, program: this.program });

        this.resize();
        this.animate(0);
    }

    private readonly animate = (time: number): void => {
        this.timeUniform.value = (time - this.timeOffset) * 0.001;

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
