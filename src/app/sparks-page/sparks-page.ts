import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Renderer, Vec2 } from 'ogl';
import { VectorFieldMesh } from './meshes/vector-field-mesh';
import { SparksMesh } from './meshes/sparks-mesh';
import { Viewport2D } from './mesh-frame/viewport-2d';
import { Clock } from './mesh-frame/clock';
import { MeshFrame } from './mesh-frame/mesh-frame';
import { Size } from './mesh-frame/size';

@Component({
    selector: 'app-sparks-page',
    template: `<canvas #canvas></canvas>`,
    styles: `
        :host {
            display: flex;
            height: 100vh;
            width: 100vw;
            background: radial-gradient(circle, #0a0a11, #0b0c11);
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
        '(window:pointermove)': 'onMouseMove($event)',
        '(document:mouseout)': 'onMouseOut($event)',
        '(window:blur)': 'onMouseLeave()',
        '(window:pointerdown)': 'onPointerDown()',
        '(window:pointerup)': 'onPointerUp()',
    },
})
export class SparksPage implements AfterViewInit, OnDestroy {
    protected readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    private renderer!: Renderer;
    private animationFrameId = 0;
    private readonly viewport = new Viewport2D();
    private readonly clock = new Clock();

    private mousePos?: Vec2;
    private isMouseDown = false;

    private readonly vectorFieldMesh = new VectorFieldMesh(this.viewport);
    private readonly sparksMesh = new SparksMesh(this.viewport);

    public ngAfterViewInit(): void {
        this.initOGL();
        this.onResize();
        this.animate();
    }

    private initOGL(): void {
        const canvas = this.canvasRef().nativeElement;

        this.renderer = new Renderer({
            canvas,
            antialias: true,
            alpha: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2),
        });

        const size = this.getSize();
        const gl = this.renderer.gl;

        this.vectorFieldMesh.init(gl);
        this.sparksMesh.init(gl, size);
    }

    protected onResize(): void {
        const size = this.getSize();
        this.viewport.resize(size);

        this.renderer.setSize(size.width, size.height);

        this.vectorFieldMesh.resize();
        this.sparksMesh.resize();
    }

    private getSize(): Size {
        const canvas = this.canvasRef().nativeElement;
        const parent = canvas.parentElement;

        return {
            width: parent?.clientWidth ?? 1,
            height: parent?.clientHeight ?? 1,
        };
    }

    private readonly animate = (): void => {
        this.animationFrameId = requestAnimationFrame(this.animate);

        this.renderer.gl.enable(this.renderer.gl.BLEND);
        this.renderer.gl.blendFunc(this.renderer.gl.ALPHA, this.renderer.gl.ONE);

        this.clock.update();

        const frame: MeshFrame = {
            clock: this.clock,
            mouse: this.mousePos
                ? {
                      position: this.mousePos,
                      forceMultiplier: this.isMouseDown ? -1.0 : 1.0,
                  }
                : undefined,
        };

        this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT);
        this.renderer.render({ scene: this.sparksMesh.update(frame) });
        //this.renderer.render({ scene: this.vectorFieldMesh.update(frame), clear: false });
    };

    public ngOnDestroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    protected onMouseMove(event: PointerEvent): void {
        this.mousePos = this.viewport.screenToWorld(new Vec2(event.clientX, event.clientY));
    }

    protected onMouseOut(event: MouseEvent): void {
        if (!event.relatedTarget || (event.relatedTarget as HTMLElement).nodeName === 'HTML') {
            this.onMouseLeave();
        }
    }

    protected onMouseLeave(): void {
        this.mousePos = undefined;
    }

    protected onPointerDown(): void {
        this.isMouseDown = true;
    }

    protected onPointerUp(): void {
        this.isMouseDown = false;
    }
}
