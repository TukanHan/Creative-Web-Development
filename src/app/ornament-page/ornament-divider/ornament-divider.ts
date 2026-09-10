import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-ornament-divider',
    imports: [NgTemplateOutlet],
    template: ` <div class="divider-container" [class.flip]="direction() === 'down'">
        <ng-container *ngTemplateOutlet="rhombusTemplate; context: { flip: true }" />
        <ng-container *ngTemplateOutlet="lineTemplate" />
        <svg class="ornament-svg" viewBox="0 -45 150 110">
            <path
                class="ornament-path"
                d="M 5 10 L 25 10 L 75 60 L 125 10 L 145 10 M 5 10 L 0 10 L 30 40 L 75 0 L 120 40 L 150 10 L 145 10"
            />
        </svg>
        <ng-container *ngTemplateOutlet="lineTemplate" />
        <ng-container *ngTemplateOutlet="rhombusTemplate" />

        <ng-template #lineTemplate>
            <svg class="line-svg" preserveAspectRatio="none" viewBox="0 0 100 2">
                <line x1="0" y1="1" x2="100" y2="1" />
            </svg>
        </ng-template>

        <ng-template #rhombusTemplate let-flip="flip">
            <svg class="rhombus-svg" [class.flip-x]="flip" viewBox="0 0 35 25">
                <path d="M 0 12.5 L 10 0 L 30 12.5 L 10 25 Z" />
            </svg>
        </ng-template>
    </div>`,
    styleUrl: './ornament-divider.css',
})
export class OrnamentDivider {
    public readonly direction = input<'up' | 'down'>('up');
}
