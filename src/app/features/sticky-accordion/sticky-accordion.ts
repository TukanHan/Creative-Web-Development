import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { MichaelIntro } from './michael-intro';
import { MichaelEpilogue } from './michael-epilogue';
import { MichaelActs } from './michael-acts/michael-acts';
import { MichaelBackground } from './michael-background/michael-background';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-sticky-accordion',
    imports: [MichaelIntro, MichaelActs, MichaelEpilogue, MichaelBackground],
    template: `
        <app-michael-background [progress]="progress()" />
        <section>
            <app-michael-intro />
        </section>
        <section>
            <app-michael-acts />
        </section>
        <section>
            <app-michael-epilogue />
        </section>
    `,
    styles: `
        :host {
            --color-primary: #fffce1;
            --story-accent: #ffffff;
            --story-background: #0e100f;
            --story-glow-level-1: rgba(255, 252, 225, 0.2);
            --story-glow-level-2: rgba(255, 252, 225, 0.4);
            --story-glow-level-3: rgba(255, 252, 225, 0.8);

            display: block;
            background: var(--story-background);
            font-family: 'Cormorant Garamond', serif;
            color: var(--color-primary);
        }
    `,
})
export class StickyAccordion {
    private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly progress = signal<number>(0);

    constructor() {
        let ctx: globalThis.ScrollTrigger | undefined;
        afterNextRender(() => (ctx = this.initAnimation()));
        this.destroyRef.onDestroy(() => ctx?.kill());
    }

    private initAnimation(): globalThis.ScrollTrigger {
        return ScrollTrigger.create({
            trigger: this.hostRef.nativeElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => this.progress.set(self.progress),
        });
    }
}
