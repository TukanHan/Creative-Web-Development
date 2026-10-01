import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-act',
    template: `
        <a href="#step" (click)="clicked.emit($event)">{{ title() }}</a>
        <div class="description">
            <div class="description__inner">
                <ng-content />
            </div>
        </div>
    `,
    styles: `
        :host {
            display: block;

            a:hover {
                opacity: 0.7;
                text-shadow: 0 0 10px var(--story-glow-level-1);
            }

            &.selected {
                a {
                    opacity: 1;
                    text-shadow:
                        0 0 8px var(--story-glow-level-2),
                        0 0 28px var(--story-glow-level-1);
                }

                .description {
                    grid-template-rows: 1fr;
                    padding-top: 8px;
                    padding-bottom: 12px;
                }

                .description__inner {
                    opacity: 0.9 !important;
                    transition: opacity 300ms ease 120ms;
                }
            }

            a {
                font-size: clamp(2rem, 3vw, 3.2rem);
                color: var(--story-accent);
                opacity: 0.35;
                text-decoration: none;
                cursor: pointer;
                display: block;
                transition:
                    opacity 0.3s ease,
                    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                    text-shadow 0.3s ease;
            }

            .description {
                display: grid;
                grid-template-rows: 0fr;
                transition:
                    grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1),
                    padding 300ms ease;
                overflow: hidden;
                width: 100%;
                max-width: 700px;
                font-size: 1.25rem;
                line-height: 1.6;
                color: rgba(235, 225, 210, 0.85);

                .description__inner {
                    min-height: 0;
                    opacity: 0;
                    transform: translateY(10px);
                    transition:
                        opacity 150ms ease,
                        transform 150ms ease;
                }
            }
        }
    `,
})
export class Act {
    public readonly title = input.required<string>();
    public readonly clicked = output<PointerEvent>();
}
