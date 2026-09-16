import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Renderer } from 'ogl';
import { VectorFieldMesh } from './vector-field-mesh';

@Component({
    selector: 'app-boids-page',
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
    private animationFrameId = 0;

    private readonly vectorFieldMesh = new VectorFieldMesh();

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

        this.vectorFieldMesh.resize(width, height);
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

        this.vectorFieldMesh.init(gl);
    }

    private readonly animate = (time: number): void => {
        this.animationFrameId = requestAnimationFrame(this.animate);

        const t = time * 0.0001;

        this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT);
        this.renderer.render({ scene: this.vectorFieldMesh.update(t) });
    };

    public ngOnDestroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}
