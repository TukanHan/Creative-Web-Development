import { Component } from '@angular/core';

import { MichaelIntro } from './michael-intro';
import { MichaelEpilogue } from './michael-epilogue';
import { MichaelActs } from './michael-acts';

//https://codepen.io/GreenSock/pen/pomvabo
@Component({
    selector: 'app-sticky-accordion',
    imports: [MichaelIntro, MichaelActs, MichaelEpilogue],
    template: `
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
export class StickyAccordion {}
