import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-michael-epilogue',
    template: `
        <h3 class="quote-stage quote-text" [class.is-done]="isDone()">
            @for (word of words; track $index) {
                <span class="word" [class.highlighted]="$index < visibleWordsCount()">
                    {{ word }}
                </span>
            }
        </h3>

        <h2 class="end-stage end-label" [class.active]="isDone()">Koniec</h2>
    `,
    styles: `
        :host {
            display: grid;
            place-items: center;
            width: 100%;
            height: 100vh;
            position: relative;
        }

        .quote-stage,
        .end-stage {
            grid-area: 1 / 1;
            width: 70%;
            text-align: center;
            transition:
                opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                filter 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .quote-text {
            font-size: 3rem;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.4em;

            .word {
                opacity: 0.2;
                transition:
                    color 0.5s ease,
                    opacity 0.5s ease,
                    text-shadow 0.5s ease;

                &.highlighted {
                    opacity: 1;
                    text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
                }
            }
        }

        .quote-stage.is-done {
            opacity: 0;
            filter: blur(8px);
            transform: scale(0.95);
        }

        .end-stage {
            opacity: 0;
            filter: blur(16px);
            transform: scale(0.8);
            pointer-events: none;

            &.active {
                opacity: 1;
                filter: blur(0px);
                transform: scale(1);
            }
        }

        .end-label {
            font-size: 6rem;
            margin: 0;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
        }
    `,
})
export class MichaelEpilogue {
    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly onDestroy = inject(DestroyRef);
    private ctx?: gsap.Context;

    protected readonly isDone = signal<boolean>(false);
    protected readonly visibleWordsCount = signal<number>(0);

    protected readonly rawQuote =
        '„Kto z pazerności chce wyżąć wszystko do samego dna,\n ten wzrok z chciwości postrada, a wstyd go spali do cna.”';
    protected readonly words = this.rawQuote.split(' ');

    constructor() {
        afterNextRender(() => (this.ctx = this.initAnimation()));
        this.onDestroy.onDestroy(() => this.ctx?.revert());
    }

    private initAnimation(): gsap.Context {
        return gsap.context(() => {
            ScrollTrigger.create({
                trigger: this.hostRef.nativeElement,
                start: 'top top',
                end: '+=150%',
                pin: true,
                anticipatePin: 1,
                scrub: 0.3,
                onUpdate: (self) => {
                    const progress = self.progress;

                    const textProgress = Math.min(progress / 0.75, 1);
                    const wordsToHighlight = Math.floor(textProgress * this.words.length);

                    this.visibleWordsCount.set(wordsToHighlight);
                    this.isDone.set(progress > 0.8);
                },
            });
        }, this.hostRef.nativeElement);
    }
}