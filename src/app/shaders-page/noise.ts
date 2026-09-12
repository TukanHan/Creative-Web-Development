import { Component, ElementRef, HostListener, input, viewChild } from '@angular/core';
import { Renderer, Geometry, Program, Mesh } from 'ogl';

import vertexShader from './shaders/shape.vert.glsl';

@Component({
    selector: 'app-noise',
    template: `<canvas #canvas></canvas>`,
    styles: `
        canvas {
            width: 100%;
            height: 100%;
            display: block;
        }
    `,
})
export class Noise {
    public readonly fragmentShader = input.required<string>();

    protected readonly canvasRef = viewChild.required('canvas', { read: ElementRef });

    private renderer!: Renderer;
    private program!: Program;
    private mesh!: Mesh;
    private animationFrameId!: number;

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
                uTime: { value: 0 },
                uResolution: { value: [canvas.clientWidth, canvas.clientHeight] },
            },
            transparent: true,
        });

        this.mesh = new Mesh(gl, { geometry, program: this.program });

        this.resize();
        this.animate(0);
    }

    private animate = (time: number): void => {
        this.program.uniforms['uTime'].value = time * 0.001;
        this.renderer.render({ scene: this.mesh });
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    @HostListener('window:resize')
    protected resize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.program.uniforms['uResolution'].value = [width, height];
    }

    public ngOnDestroy(): void {
        cancelAnimationFrame(this.animationFrameId);
    }
}
