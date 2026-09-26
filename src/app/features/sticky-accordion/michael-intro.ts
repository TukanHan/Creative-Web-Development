import { Component } from '@angular/core';

@Component({
    selector: 'app-michael-intro',
    template: `
        <h2>Prawdziwa, Nieocenzurowana Historia o Niemym Michałku</h2>
        <h3>Oto pełna wersja wydarzeń, której batiuszka zabronił opowiadać przy kieliszku.</h3>
        <h4>
            „Wszyscy we wsi myśleli, że narodził się bez głosu. Prawda okazała się znacznie gorsza.”
        </h4>`,
    styles: `
        :host {
            width: 100%;
            height: 100vh;
            font-size: 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `,
})
export class MichaelIntro {}
