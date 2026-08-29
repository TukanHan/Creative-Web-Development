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
    alt: string;
}

@Component({
    selector: 'app-parallax',
    template: ` @for (layer of layers; track layer.src) {
        <img
            #layerEl
            [src]="'firewatch/' + layer.src"
            [alt]="layer.alt"
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
        { src: 'parallax0@2x.png', speed: 0.02, alt: 'Sky' },
        { src: 'parallax1.png', speed: 0.05, alt: 'Góry daleko' },
        { src: 'parallax2.png', speed: 0.11, alt: 'Góry bliżej' },
        { src: 'parallax3@2x.png', speed: 0.16, alt: 'Mgła i las' },
        { src: 'parallax4@2x.png', speed: 0.26, alt: 'Drzewa środkowe' },
        { src: 'parallax5@2x.png', speed: 0.36, alt: 'Ścieżka i wieża' },
        { src: 'parallax6@2x.png', speed: 0.49, alt: 'Skały' },
        { src: 'parallax7@2x.png', speed: 0.69, alt: 'Drzewa przednie' },
        { src: 'parallax8@2x.png', speed: 1.0, alt: 'Pierwszy plan' },
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
