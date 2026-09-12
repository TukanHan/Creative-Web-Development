import { Component, computed, input } from '@angular/core';
import { Noise } from './noise';

import noiseShader from './shaders/noise.frag.glsl';
import smokeShader from './shaders/smoke.frag.glsl';
import blackHoleShader from './shaders/black-hole.frag.glsl';

const SHADERS_MAP: Record<string, string> = {
    noise: noiseShader,
    smoke: smokeShader,
    'black-hole': blackHoleShader
};

@Component({
    selector: 'app-shaders-page',
    imports: [Noise],
    template: `<app-noise class="noise-container" [fragmentShader]="fragmentShader()" />
        <h1 class="title-section">
            @switch (type()) {
                @case ('smoke') {
                    Smoke
                } @case ('black-hole') {
                    Black<br>hole
                } @default {
                    Noise
                }
            }
        </h1>`,
    styles: `
        :host {
            display: flex;
            width: 100%;
            min-height: 100vh;

            --shaders-page-background: unset;
            --shaders-page-label-color: black;
            --shaders-page-label-blend-mode: unset;

            &.smoke {
                --shaders-page-background: #111;
                --shaders-page-label-color: white;
            }
            &.black-hole {
                --shaders-page-label-blend-mode: overlay;
            }
        }
        .noise-container {
            position: absolute;
            background: var(--shaders-page-background);
            z-index: -1;
        }
        .title-section {
            margin: auto;
            text-align: center;
            font-size: clamp(8rem, 15vw, 30rem);
            font-family: sans-serif;
            text-transform: uppercase;
            color: var(--shaders-page-label-color);
            mix-blend-mode: var(--shaders-page-label-blend-mode);
        }
    `,
    host: {
        '[class]': 'type()',
    },
})
export class ShadersPage {
    public readonly type = input.required<string>();

    public readonly fragmentShader = computed(() => SHADERS_MAP[this.type()]);
}
