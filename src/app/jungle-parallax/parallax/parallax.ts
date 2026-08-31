import {
    afterNextRender,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    viewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayer {
    src: string;
    speed: number;
}

@Component({
    selector: 'app-parallax',
    template: ` @for (layer of layers; track layer.src) {
        <img
            #layerEl
            [src]="'jungle/' + layer.src"
            [attr.data-speed]="layer.speed"
            class="parallax-layer"
        />
    }`,
    styleUrl: './parallax.css',
})
export class Parallax {
    private ctx!: gsap.Context;

    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    protected readonly layerElements = viewChildren<ElementRef<HTMLImageElement>>('layerEl');

    private readonly destroyRef = inject(DestroyRef);

    protected readonly layers: ParallaxLayer[] = [
        { src: 'moon.jpg', speed: 0.02 },
        { src: 'l4.png', speed: 0.26 },
        { src: 'l3.png', speed: 0.49 },
        { src: 'l2.png', speed: 0.6 },
        { src: 'l1.png', speed: 1 },
    ];

    constructor() {
        afterNextRender(() => {
            this.initParallaxAnimation();
        });

        this.destroyRef.onDestroy(() => {
            this.ctx?.revert();
        });
    }

    private initParallaxAnimation(): void {
        this.ctx = gsap.context(() => {
            const h = this.hostRef.nativeElement.offsetHeight;

            this.layerElements().forEach((layerRef) => {
                const el = layerRef.nativeElement;
                const speed = parseFloat(el.getAttribute('data-speed') || '1.0');

                const targetY = h * (1 - speed);

                if (targetY === 0) {
                    return;
                }

                gsap.to(el, {
                    y: targetY,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: this.hostRef.nativeElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            });
        }, this.hostRef.nativeElement);
    }
}
