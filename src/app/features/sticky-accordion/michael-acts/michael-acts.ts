import {
    afterNextRender,
    Component,
    computed,
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
                <app-act
                    [class.selected]="activeIndex() === 0"
                    (clicked)="goToStep($event, 0)"
                    title="Lament nad Ciszą"
                >
                    Michałek od dziecka nie wykrztusił ani słowa. Matka płakała w poduszkę,
                    batiuszka odprawiał egzorcyzmy, a wieś współczuła chłopcu, który żył w wiecznym,
                    głębokim milczeniu.
                </app-act>
                <app-act
                    [class.selected]="activeIndex() === 1"
                    (clicked)="goToStep($event, 1)"
                    title="Odpustowy Kupiec"
                >
                    Podczas odpustu św. Antoniego, Michałek oddał pięćdziesiąt groszy skradzionych
                    ze skarbonki sołtysa wędrownemu handlarzowi. W zamian otrzymał zakazany owoc
                    cywilizacji: gumę Turbo z obrazkiem auta.
                </app-act>
                <app-act
                    [class.selected]="activeIndex() === 2"
                    (clicked)="goToStep($event, 2)"
                    title="Trzy Dni Męki"
                >
                    Smak owoców leśnych zniknął po dziesięciu sekundach, ale Michałek nie
                    odpuszczał. Żuł Tę Samą Gumę przez trzy dni i trzy noce. Mięśnie żuchwy
                    pracowały jak tłoki w parowozie, a guma zmieniła się w twardy jak skała kauczuk.
                </app-act>
                <app-act
                    [class.selected]="activeIndex() === 3"
                    (clicked)="goToStep($event, 3)"
                    title="Ciemność Bolesna"
                >
                    Trzeciego dnia ciśnienie w czaszce osiągnęło poziom krytyczny. Zgromadzona siła
                    w żuchwie wystrzeliła w nerwy wzrokowe. W oczach Michałka zapadła absolutna,
                    nieprzenikniona ciemność. Oślepł jak kret.
                </app-act>
                <app-act
                    [class.selected]="activeIndex() === 4"
                    (clicked)="goToStep($event, 4)"
                    title="Wielki Wrzask i Wielki Wstyd"
                >
                    Obojętny dotąd chłopak, przerażony nagłą utratą wzroku, zapomniał o swojej roli.
                    Rozwarł usta i wrzasnął na całą wieś:
                    <strong class="curse">„O, KURWA!”</strong>. Po czym, zorientowawszy się co
                    zrobił i spłonąwszy ze wstydu przed ludźmi – zamilkł już na wieki.
                </app-act>
            </nav>

            <app-dynamic-image
                class="right"
                [prevSrc]="previousImageSrc()"
                [currentSrc]="currentImageSrc()"
                [progress]="progress()"
            />
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
                    height: 0;
                    background-color: var(--story-accent);
                    box-shadow: 0 0 12px var(--story-accent);
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
            }
        }
    `,
})
export class MichaelActs {
    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly stepItems = viewChildren(Act);
    private readonly fill = viewChild.required<ElementRef<HTMLElement>>('fill');

    private readonly destroyRef = inject(DestroyRef);

    private readonly previousIndex = signal(0);
    protected readonly activeIndex = signal(0);
    protected readonly progress = signal<number>(0);
    protected readonly currentImageSrc = computed<string>(
        () => `michael/act-${this.activeIndex() + 1}.webp`,
    );
    protected readonly previousImageSrc = computed<string>(
        () => `michael/act-${this.previousIndex() + 1}.webp`,
    );

    private st!: ScrollTrigger;

    constructor() {
        let ctx: gsap.Context | undefined;
        afterNextRender(() => (ctx = this.initAnimation()));
        this.destroyRef.onDestroy(() => ctx?.revert());
    }

    private initAnimation(): gsap.Context {
        return gsap.context(() => {
            const stepCount = this.stepItems().length;

            this.st = ScrollTrigger.create({
                trigger: this.hostRef.nativeElement,
                start: 'top top',
                end: () => '+=' + stepCount * 100 + '%',
                pin: true,
                onUpdate: (self) => {
                    this.progress.set(self.progress);
                    const newIndex = Math.min(Math.floor(self.progress * stepCount), stepCount - 1);

                    if (newIndex !== this.activeIndex()) {
                        this.previousIndex.set(this.activeIndex());
                        this.activeIndex.set(newIndex);
                    }
                },
            });

            gsap.to(this.fill().nativeElement, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: this.hostRef.nativeElement,
                    start: 'top top',
                    end: () => '+=' + stepCount * 100 + '%',
                    scrub: true,
                },
            });
        });
    }

    protected goToStep(event: Event, index: number): void {
        event.preventDefault();

        const totalSteps = this.stepItems().length;
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
