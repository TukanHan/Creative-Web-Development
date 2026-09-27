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

@Component({
    selector: 'app-michael-acts',
    template: ` <div class="content">
        <nav class="list">
            <div #stepItem class="chapter">
                <a href="#step-0" (click)="goToStep($event, 0)">Lament nad Ciszą</a>
                <div class="description">
                    <div class="description__inner">
                        Michałek od dziecka nie wykrztusił ani słowa. Matka płakała w poduszkę,
                        batiuszka odprawiał egzorcyzmy, a wieś współczuła chłopcu, który żył w
                        wiecznym, głębokim milczeniu.
                    </div>
                </div>
            </div>
            <div #stepItem class="chapter">
                <a href="#step-1" (click)="goToStep($event, 1)">Odpustowy Kupiec</a>
                <div class="description">
                    <div class="description__inner">
                        Podczas odpustu św. Antoniego, Michałek oddał pięćdziesiąt groszy
                        skradzionych ze skarbonki sołtysa wędrownemu handlarzowi. W zamian otrzymał
                        zakazany owoc cywilizacji: gumę Turbo z obrazkiem auta.
                    </div>
                </div>
            </div>
            <div #stepItem class="chapter">
                <a href="#step-2" (click)="goToStep($event, 2)">Trzy Dni Męki</a>
                <div class="description">
                    <div class="description__inner">
                        Smak owoców leśnych zniknął po dziesięciu sekundach, ale Michałek nie
                        odpuszczał. Żuł Tę Samą Gumę przez trzy dni i trzy noce. Mięśnie żuchwy
                        pracowały jak tłoki w parowozie, a guma zmieniła się w twardy jak skała
                        kauczuk.
                    </div>
                </div>
            </div>
            <div #stepItem class="chapter">
                <a href="#step-3" (click)="goToStep($event, 3)">Ciemność Bolesna</a>
                <div class="description">
                    <div class="description__inner">
                        Trzeciego dnia ciśnienie w czaszce osiągnęło poziom krytyczny. Zgromadzona
                        siła w żuchwie wystrzeliła w nerwy wzrokowe. W oczach Michałka zapadła
                        absolutna, nieprzenikniona ciemność. Oślepł jak kret.
                    </div>
                </div>
            </div>
            <div #stepItem class="chapter">
                <a href="#step-4" (click)="goToStep($event, 4)">Wielki Wrzask i Wielki Wstyd</a>
                <div class="description">
                    <div class="description__inner">
                        Obojętny dotąd chłopak, przerażony nagłą utratą wzroku, zapomniał o swojej
                        roli. Rozwarł usta i wrzasnął na całą wieś: „O, KURWA!”. Po czym,
                        zorientowawszy się co zrobił i spłonawszy ze wstydu przed ludźmi – zamilkł
                        już na wieki.
                    </div>
                </div>
            </div>
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
            <div #slideItem class="slide">
                <img src="https://assets.codepen.io/16327/portrait-number-05.png" alt="" />
            </div>
        </div>
    </div>`,
    styles: `
        :host {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            //border-top: dashed 2px var(--color-surface50);
            //border-bottom: dashed 2px var(--color-surface50);
        }

        .content {
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            display: flex;
            padding: 0 10px;
            position: relative;

            .list {
                display: flex;
                flex-direction: column;
                gap: 6px;

                .chapter {
                    &.selected {
                        a {
                            color: var(--color-shockingly-green);
                        }

                        .description {
                            grid-template-rows: 1fr;
                            padding: 8px 0;
                            transition: grid-template-rows 300ms ease;
                        }
                    }

                    a {
                        font-size: 3rem;
                        color: var(--color-surface-white);
                        text-decoration: none;
                        cursor: pointer;
                        transition: color 0.3s ease;
                    }

                    .description {
                        display: grid;
                        grid-template-rows: 0fr;
                        transition: none;
                        overflow: hidden;
                        width: 750px;
                        font-size: 1.4rem;

                        .description__inner {
                            min-height: 0;
                        }
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
export class MichaelActs {
    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
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
                        trigger: this.hostRef.nativeElement,
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
