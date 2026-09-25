import {
    afterNextRender,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    viewChild,
    viewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//https://codepen.io/GreenSock/pen/pomvabo
@Component({
    selector: 'app-sticky-accordion',
    template: `
        <section class="section">
            <h2>Przewijaj w dół</h2>
        </section>
        <section class="section pin-section" #pinedSection>
            <div class="content">
                <nav class="list">
                    <a #stepItem href="#step-0" (click)="goToStep($event, 0)">Animate</a>
                    <a #stepItem href="#step-1" (click)="goToStep($event, 1)">Anything</a>
                    <a #stepItem href="#step-2" (click)="goToStep($event, 2)">With</a>
                    <a #stepItem href="#step-3" (click)="goToStep($event, 3)">GSAP</a>
                </nav>
                <div class="fill" #fill></div>
                <div class="right">
                    <div #slideItem class="slide">
                        <img src="https://assets.codepen.io/16327/portrait-number-01.png" alt="" />
                    </div>
                    <div #slideItem class="slide">
                        <img src="https://assets.codepen.io/16327/portrait-number-02.png" alt="" />
                    </div>
                    <div #slideItem class="slide">
                        <img src="https://assets.codepen.io/16327/portrait-number-03.png" alt="" />
                    </div>
                    <div #slideItem class="slide">
                        <img src="https://assets.codepen.io/16327/portrait-number-04.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <h3>Przewijaj w górę</h3>
        </section>
    `,
    styles: `
        :host {
            --color-surface50: #7c7c6f;
            --color-surface-white: #fffce1;
            --color-shockingly-green: #0ae448;
            --dark: #0e100f;

            display: block;
            background: var(--dark);
            font-family: sans-serif;
            color: var(--color-surface-white);
        }

        .section {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;

            &.pin-section {
                border-top: dashed 2px var(--color-surface50);
                border-bottom: dashed 2px var(--color-surface50);
            }
        }

        .content {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            padding: 0 10px;
            position: relative;

            .list {
                display: flex;
                flex-direction: column;

                a {
                    font-size: 30px;
                    color: var(--color-surface-white);
                    text-decoration: none;
                    cursor: pointer;
                    transition: color 0.3s ease;

                    &:focus-visible {
                        outline: 2px solid var(--color-shockingly-green);
                        outline-offset: 4px;
                    }

                    &.selected {
                        color: var(--color-shockingly-green);
                    }
                }
            }

            .fill {
                position: absolute;
                top: 0;
                left: 0;
                width: 2px;
                height: 100%;
                background-color: var(--color-shockingly-green);
            }

            .right {
                flex-grow: 1;
                position: relative;

                .slide {
                    position: absolute;
                    width: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 1rem;
                    opacity: 0;
                    visibility: hidden;
                    border-radius: 10px;

                    img {
                        width: 100%;
                        max-width: 300px;
                    }
                }
            }
        }
    `,
})
export class StickyAccordion {
    private readonly pinedSection = viewChild.required<ElementRef<HTMLElement>>('pinedSection');
    private readonly stepItems = viewChildren<ElementRef<HTMLElement>>('stepItem');
    private readonly slideItems = viewChildren<ElementRef<HTMLElement>>('slideItem');
    private readonly fill = viewChild.required<ElementRef<HTMLElement>>('fill');

    private readonly destroyRef = inject(DestroyRef);

    private ctx!: gsap.Context;
    private tl!: gsap.core.Timeline;

    constructor() {
        afterNextRender(() => {
            this.ctx = gsap.context(() => {
                const steps = this.stepItems().map((item) => item.nativeElement);
                const slides = this.slideItems().map((item) => item.nativeElement);

                gsap.set(slides[0], { autoAlpha: 1 });
                steps[0].classList.add('selected');

                gsap.set(this.fill().nativeElement, {
                    scaleY: 1 / slides.length,
                    transformOrigin: 'top left',
                });

                this.tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.pinedSection().nativeElement,
                        start: 'top top',
                        end: () => '+=' + steps.length * 100 + '%',
                        pin: true,
                        scrub: true,
                        onUpdate: (self) => {
                            const activeIndex = Math.floor(self.progress * steps.length);
                            const clampedIndex = Math.min(activeIndex, steps.length - 1);
                            steps.forEach((step, i) => {
                                step.classList.toggle('selected', i === clampedIndex);
                            });
                        },
                    },
                });

                slides.forEach((slide, i) => {
                    if (i === 0) {
                        return;
                    }

                    const prevSlide = slides[i - 1];

                    this.tl
                        .to(prevSlide, { autoAlpha: 0, duration: 0.2 }, i)
                        .to(slide, { autoAlpha: 1, duration: 0.2 }, '<');
                });

                this.tl.to(
                    this.fill().nativeElement,
                    {
                        scaleY: 1,
                        transformOrigin: 'top left',
                        ease: 'none',
                        duration: this.tl.duration(),
                    },
                    0,
                );

                this.tl.to({}, { duration: 0.5 });
            });
        });

        this.destroyRef.onDestroy(() => {
            this.ctx.revert();
        });
    }

    protected goToStep(event: Event, index: number): void {
        event.preventDefault();

        const totalSteps = this.slideItems().length;
        if (totalSteps <= 1) {
            return;
        }

        const progress = index / (totalSteps - 1);
        const st = this.tl.scrollTrigger;

        if (st) {
            const targetY = st.start + (st.end - st.start) * progress;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth',
            });
        }
    }
}
