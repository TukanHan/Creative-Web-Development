import { Component } from '@angular/core';
import { Noise } from './noise';

@Component({
    selector: 'app-host',
    imports: [Noise],
    template: `<app-noise class="noise-container"></app-noise>
        <h1 class="title-section">Noise</h1>`,
    styles: `
        :host {
            display: flex;
            width: 100%;
            min-height: 100vh;
        }
        .noise-container {
            position: absolute;
            z-index: -1;
        }
        .title-section {
            margin: auto;
            font-size: clamp(8rem, 15vw, 30rem);
            font-family: sans-serif;
            text-transform: uppercase;
        }
    `,
})
export class Host {}
