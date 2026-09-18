import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Renderer } from 'ogl';
import { VectorFieldMesh } from './meshes/vector-field-mesh';
import { BoidsMesh } from './meshes/boids-mesh';
import { Viewport2D } from './viewport-2d';
import { Clock } from './clock';

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
    private readonly viewport = new Viewport2D();
    private readonly clock = new Clock();

    private readonly vectorFieldMesh = new VectorFieldMesh(this.viewport);
    private readonly boidsMesh = new BoidsMesh(this.viewport);

    public ngAfterViewInit(): void {
        this.initOGL();
        this.onResize();
        this.animate();
    }

    protected onResize(): void {
        const canvas = this.canvasRef().nativeElement;
        const parent = canvas.parentElement;
        if (!parent) {
            return;
        }

        this.viewport.resize(parent.clientWidth, parent.clientHeight);

        if (this.viewport.width === 0 || this.viewport.height === 0) {
            return;
        }

        this.renderer.setSize(this.viewport.width, this.viewport.height);

        this.vectorFieldMesh.resize();
        this.boidsMesh.resize();
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
        this.boidsMesh.init(gl);
    }

    private readonly animate = (): void => {
        this.animationFrameId = requestAnimationFrame(this.animate);

        this.clock.update();

        this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT);
        this.renderer.render({ scene: this.boidsMesh.update(this.clock) });
        this.renderer.render({ scene: this.vectorFieldMesh.update(this.clock), clear: false });
    };

    public ngOnDestroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}
