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

@Component({
    selector: 'app-parallax',
    imports: [],
    template: `
        <img #layerEl src="cow/B.webp" [attr.data-speed]="0.8" class="parallax-layer" />
        <span #layerEl [attr.data-speed]="0" class="parallax-text">K_RO</span>
        <img #layerEl src="cow/F.webp" [attr.data-speed]="1" class="parallax-layer" />
    `,
    styleUrl: './parallax.css',
})
export class Parallax {
    private ctx!: gsap.Context;

    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    protected readonly layerElements = viewChildren<ElementRef<HTMLImageElement>>('layerEl');

    private readonly destroyRef = inject(DestroyRef);

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
