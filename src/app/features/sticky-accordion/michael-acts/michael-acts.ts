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
import { Act } from './act';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-michael-acts',
    imports: [Act],
    template: `
        <div class="content">
            <div class="fill-track">
                <div class="fill" #fill></div>
            </div>

            <nav class="list">
                <app-act #stepItem (clicked)="goToStep($event, 0)" title="Lament nad Ciszą">
                    Michałek od dziecka nie wykrztusił ani słowa. Matka płakała w poduszkę,
                    batiuszka odprawiał egzorcyzmy, a wieś współczuła chłopcu, który żył w wiecznym,
                    głębokim milczeniu.
                </app-act>
                <app-act #stepItem (clicked)="goToStep($event, 1)" title="Odpustowy Kupiec">
                    Podczas odpustu św. Antoniego, Michałek oddał pięćdziesiąt groszy skradzionych
                    ze skarbonki sołtysa wędrownemu handlarzowi. W zamian otrzymał zakazany owoc
                    cywilizacji: gumę Turbo z obrazkiem auta.
                </app-act>
                <app-act #stepItem (clicked)="goToStep($event, 2)" title="Trzy Dni Męki">
                    Smak owoców leśnych zniknął po dziesięciu sekundach, ale Michałek nie
                    odpuszczał. Żuł Tę Samą Gumę przez trzy dni i trzy noce. Mięśnie żuchwy
                    pracowały jak tłoki w parowozie, a guma zmieniła się w twardy jak skała kauczuk.
                </app-act>
                <app-act #stepItem (clicked)="goToStep($event, 3)" title="Ciemność Bolesna">
                    Trzeciego dnia ciśnienie w czaszce osiągnęło poziom krytyczny. Zgromadzona siła
                    w żuchwie wystrzeliła w nerwy wzrokowe. W oczach Michałka zapadła absolutna,
                    nieprzenikniona ciemność. Oślepł jak kret.
                </app-act>
                <app-act
                    #stepItem
                    (clicked)="goToStep($event, 4)"
                    title="Wielki Wrzask i Wielki Wstyd"
                >
                    Obojętny dotąd chłopak, przerażony nagłą utratą wzroku, zapomniał o swojej roli.
                    Rozwarł usta i wrzasnął na całą wieś:
                    <strong class="curse">„O, KURWA!”</strong>. Po czym, zorientowawszy się co
                    zrobił i spłonąwszy ze wstydu przed ludźmi – zamilkł już na wieki.
                </app-act>
            </nav>

            <div class="right">
                <div #slideItem class="slide">
                    <img src="https://assets.codepen.io/16327/portrait-number-01.png" alt="Akt 1" />
                </div>
                <div #slideItem class="slide">
                    <img src="https://assets.codepen.io/16327/portrait-number-02.png" alt="Akt 2" />
                </div>
                <div #slideItem class="slide">
                    <img src="https://assets.codepen.io/16327/portrait-number-03.png" alt="Akt 3" />
                </div>
                <div #slideItem class="slide">
                    <img src="https://assets.codepen.io/16327/portrait-number-04.png" alt="Akt 4" />
                </div>
                <div #slideItem class="slide">
                    <img src="https://assets.codepen.io/16327/portrait-number-05.png" alt="Akt 5" />
                </div>
            </div>
        </div>
    `,
    styles: `
        :host {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .content {
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            display: flex;
            padding: 0 2rem;
            position: relative;
            align-items: center;
            gap: 4rem;

            .fill-track {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background-color: rgba(255, 255, 255, 0.08);

                .fill {
                    width: 100%;
                    height: 100%;
                    background-color: var(--story-accent);
                    box-shadow: 0 0 12px var(--story-accent);
                    transform-origin: top left;
                    scale: 1 0;
                }
            }

            .list {
                display: flex;
                flex-direction: column;
                gap: 10px;
                flex: 1;
            }

            .curse {
                color: var(--story-accent);
                text-shadow: 0 0 10px var(--story-glow-level-2);
                font-weight: bold;
            }

            .right {
                flex: 1;
                position: relative;
                height: 500px;
                display: flex;
                justify-content: center;
                align-items: center;

                .slide {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    visibility: hidden;

                    img {
                        max-width: 340px;
                        width: 100%;
                        height: auto;
                        border-radius: 12px;
                        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
                    }
                }
            }
        }
    `,
})
export class MichaelActs {
    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly stepItems = viewChildren<Act, ElementRef<HTMLElement>>(Act, {
        read: ElementRef,
    });
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

                this.tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.hostRef.nativeElement,
                        start: 'top top',
                        end: () => '+=' + steps.length * 100 + '%',
                        pin: true,
                        scrub: 0.5,
                        onUpdate: (self) => {
                            const activeIndex = Math.min(
                                Math.floor(self.progress * steps.length),
                                steps.length - 1,
                            );

                            steps.forEach((step, i) => {
                                step.classList.toggle('selected', i === activeIndex);
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
                        .to(prevSlide, { autoAlpha: 0, duration: 0.4 }, i)
                        .to(slide, { autoAlpha: 1, duration: 0.4 }, '<');
                });

                this.tl.to(
                    this.fill().nativeElement,
                    {
                        scaleY: 1,
                        ease: 'none',
                        duration: steps.length - 1,
                    },
                    0,
                );
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
