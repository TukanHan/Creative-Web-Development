import { Component } from '@angular/core';

@Component({
    selector: 'app-michael-epilogue',
    template: `
        <div class="a">
            <h3>
                „Kto z pazerności chce wyżąć wszystko do samego dna,
                <br />
                ten wzrok z chciwości postrada, a wstyd go spali do cna.”
            </h3>
        </div>
        <div class="b">
            <h2 class="label">Koniec</h2>
            <p class="hint">
                Michałek do dziś czeka na miedzy. Jeśli przewiniesz stronę w górę, zaczniesz tę
                absurdalną podróż od nowa.
            </p>
        </div>
    `,
    styles: `
        :host {
            height: 100vh;

            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;

            .a {
                font-size: 3rem;
            }

            .b {
                display: none;
                .label {
                    font-size: 6rem;
                    margin: 0;
                }

                .hint {
                    opacity: 0.5;
                }
            }
        }
    `,
})
export class MichaelEpilogue {}
