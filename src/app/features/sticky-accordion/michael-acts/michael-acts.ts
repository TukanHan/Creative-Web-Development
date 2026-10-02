import {
    afterNextRender,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    signal,
    viewChild,
    viewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act } from './act';
import { DynamicImage } from './dynamic-image/dynamic-image';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-michael-acts',
    imports: [Act, DynamicImage],
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
                    <app-dynamic-image src="michael/act-1.webp" alt="Akt 1" [progress]="progress()" />
                </div>
                <div #slideItem class="slide">
                    <app-dynamic-image src="michael/act-2.webp" alt="Akt 2" [progress]="progress()" />
                </div>
                <div #slideItem class="slide">
                    <app-dynamic-image src="michael/act-3.webp" alt="Akt 3" [progress]="progress()" />
                </div>
                <div #slideItem class="slide">
                    <app-dynamic-image src="michael/act-4.webp" alt="Akt 4" [progress]="progress()" />
                </div>
                <div #slideItem class="slide">
                    <app-dynamic-image src="michael/act-5.webp" alt="Akt 5" [progress]="progress()" />
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
                z-index: 1;
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
                position: relative;
                z-index: 1;
            }

            .curse {
                color: var(--story-accent);
                text-shadow: 0 0 10px var(--story-glow-level-2);
                font-weight: bold;
            }

            .right {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 100vw;
                height: 100vh;
                transform: translate(-50%, -50%);
                z-index: 0;
                pointer-events: none;

                .slide {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    visibility: hidden;
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

    private readonly activeIndex = signal(0);
    protected readonly progress = signal<number>(0);

    private ctx!: gsap.Context;
    private st!: ScrollTrigger;

    constructor() {
        afterNextRender(() => {
            this.ctx = gsap.context(() => {
                const steps = this.stepItems().map((item) => item.nativeElement);
                const slides = this.slideItems().map((item) => item.nativeElement);

                gsap.set(slides, { autoAlpha: 0 });
                gsap.set(slides[0], { autoAlpha: 1 });
                steps[0].classList.add('selected');

                this.st = ScrollTrigger.create({
                    trigger: this.hostRef.nativeElement,
                    start: 'top top',
                    end: () => '+=' + steps.length * 100 + '%',
                    pin: true,
                    onUpdate: (self) => {
                        this.progress.set(self.progress);
                        const newIndex = Math.min(
                            Math.floor(self.progress * steps.length),
                            steps.length - 1,
                        );
                        if (newIndex !== this.activeIndex()) {
                            this.updateStep(newIndex);
                        }
                    },
                });

                gsap.to(this.fill().nativeElement, {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: this.hostRef.nativeElement,
                        start: 'top top',
                        end: () => '+=' + steps.length * 100 + '%',
                        scrub: true,
                    },
                });
            });
        });

        this.destroyRef.onDestroy(() => {
            this.ctx.revert();
        });
    }

    private updateStep(newIndex: number): void {
        const slides = this.slideItems().map((item) => item.nativeElement);
        const steps = this.stepItems().map((item) => item.nativeElement);
        const oldIndex = this.activeIndex();

        this.activeIndex.set(newIndex);

        steps.forEach((step, i) => step.classList.toggle('selected', i === newIndex));

        gsap.to(slides[oldIndex], { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' });
        gsap.to(slides[newIndex], { autoAlpha: 1, duration: 0.4, ease: 'power2.inOut' });
    }

    protected goToStep(event: Event, index: number): void {
        event.preventDefault();

        const totalSteps = this.slideItems().length;
        if (totalSteps <= 1) {
            return;
        }

        const progress = index / (totalSteps - 1);
        const st = this.st;

        const targetY = st.start + (st.end - st.start) * progress;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth',
        });
    }
}
