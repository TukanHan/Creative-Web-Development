import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-michael-intro',
    template: `
        <div class="text-stage">
            <header class="intro-text title" [class.active]="step() === 'title'">
                <p class="sub">Prawdziwa, Nieocenzurowana:</p>
                <h1 class="main">Historia o Niemym Michałku</h1>
            </header>
            <h2 class="intro-text subtitle" [class.active]="step() === 'subtitle'">
                Oto pełna wersja wydarzeń, której batiuszka zabronił opowiadać przy kieliszku.
            </h2>
            <p class="intro-text quote" [class.active]="step() === 'quote'">
                „Wszyscy we wsi myśleli, że narodził się bez głosu.<br />
                Prawda okazała się znacznie gorsza.”
            </p>
        </div>

        <div class="scroll-hint" [class.is-scrolled]="step() !== 'title'">
            <span class="scroll-hint__text">Przewiń, by poznać prawdę</span>
        </div>
    `,
    styles: `
        :host {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .text-stage {
            display: grid;
            place-items: center;
            width: 70%;
            text-align: center;
        }

        .intro-text {
            grid-area: 1 / 1;
            margin: 0;
            width: 100%;
            pointer-events: none;

            opacity: 0;
            filter: blur(10px);
            transform: scale(0.9);
            transition:
                opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1),
                filter 1.2s cubic-bezier(0.25, 1, 0.5, 1),
                transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);

            &.active {
                opacity: 1;
                filter: blur(0px);
                transform: scale(1);
            }
        }

        .title {
            .sub {
                font-size: 1.5rem;
                text-transform: uppercase;
                letter-spacing: 0.3em;
            }

            .main {
                font-size: 5rem;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                font-weight: 900;
                color: #ffffff;

                text-shadow:
                    0 0 10px rgba(255, 255, 255, 0.8),
                    0 0 30px rgba(255, 255, 255, 0.4),
                    0 0 60px rgba(212, 175, 55, 0.3);
            }
        }

        .subtitle {
            font-size: 4rem;
            font-weight: 400;
            font-style: italic;
            line-height: 1.4;
            transform: translateY(10px) scale(0.95);

            &.active {
                transform: translateY(0) scale(1);
            }
        }

        .quote {
            font-size: 3rem;
            line-height: 1.5;
        }

        .scroll-hint {
            position: absolute;
            bottom: 10%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;

            opacity: 1;
            visibility: visible;
            transition:
                opacity 0.5s ease,
                visibility 0s linear 0s;

            &.is-scrolled {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition:
                    opacity 0.5s ease,
                    visibility 0s linear 0.5s;
            }

            .scroll-hint__text {
                font-size: 0.75rem;
                letter-spacing: 0.4em;
                text-transform: uppercase;
                animation: cinematicBreath 2s ease-in-out infinite alternate;
            }
        }

        @keyframes cinematicBreath {
            0% {
                opacity: 0.1;
                text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
            }
            100% {
                opacity: 0.4;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            }
        }
    `,
})
export class MichaelIntro {
    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly onDestroy = inject(DestroyRef);
    private ctx?: gsap.Context;

    protected readonly step = signal<'title' | 'subtitle' | 'quote'>('title');

    constructor() {
        afterNextRender(() => (this.ctx = this.initAnimation()));
        this.onDestroy.onDestroy(() => this.ctx?.revert());
    }

    private initAnimation(): gsap.Context {
        return gsap.context(() => {
            ScrollTrigger.create({
                trigger: this.hostRef.nativeElement,
                start: 'top top',
                end: '+=120%',
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress;

                    if (progress < 0.35) {
                        this.step.set('title');
                    } else if (progress >= 0.35 && progress < 0.7) {
                        this.step.set('subtitle');
                    } else {
                        this.step.set('quote');
                    }
                },
            });
        }, this.hostRef.nativeElement);
    }
}
