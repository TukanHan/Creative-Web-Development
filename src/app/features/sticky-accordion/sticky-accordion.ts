import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { MichaelIntro } from './michael-intro';
import { MichaelEpilogue } from './michael-epilogue';
import { MichaelActs } from './michael-acts';
import { MichaelBackground } from './michael-background/michael-background';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//https://codepen.io/GreenSock/pen/pomvabo
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
            --color-surface50: #7c7c6f;
            --color-surface-white: #fffce1;
            --color-shockingly-green: #0ae448;
            --dark: #0e100f;

            display: block;
            background: var(--dark);
            font-family: 'Cormorant Garamond', serif;
            color: var(--color-surface-white);
        }
    `,
})
export class StickyAccordion {
    private readonly destroyRef = inject(DestroyRef);
    private ctx?: globalThis.ScrollTrigger;

    protected readonly progress = signal<number>(0);

    constructor() {
        afterNextRender(() => (this.ctx = this.initAnimation()));
        this.destroyRef.onDestroy(() => this.ctx?.kill());
    }

    private initAnimation(): globalThis.ScrollTrigger {
        return ScrollTrigger.create({
            trigger: 'host',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => this.progress.set(self.progress),
        });
    }
}
