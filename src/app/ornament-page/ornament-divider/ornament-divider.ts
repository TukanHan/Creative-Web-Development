import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-ornament-divider',
    imports: [NgTemplateOutlet],
    template: ` <div class="divider-container" [class.flip]="direction() === 'down'">
        <ng-container *ngTemplateOutlet="rhombusTemplate; context: { flip: true }" />
        <ng-container *ngTemplateOutlet="lineTemplate" />
        <svg class="ornament-svg" viewBox="0 0 150 50">
            <path
                class="ornament-path"
                d="M 5 0
                L 25 0
                L 75 50 
                L 125 0
                L 145 0
                M 5 0
                L 0 0
                L 30 30 
                L 75 -10 
                L 120 30 
                L 150 0
                L 145 0"
            />
        </svg>
        <ng-container *ngTemplateOutlet="lineTemplate" />
        <ng-container *ngTemplateOutlet="rhombusTemplate; context: { direction: 'right' }" />

        <ng-template #lineTemplate>
            <svg class="line-svg" preserveAspectRatio="none" viewBox="0 0 100 2">
                <line x1="0" y1="0" x2="100" y2="0" />
            </svg>
        </ng-template>

        <ng-template #rhombusTemplate let-flip="flip">
            <svg class="rhombus-svg" [class.flip-x]="flip" viewBox="0 0 30 25">
                <path d="M 0 0 L 10 -12.5 L 30 0 L 10 12.5 Z"/>
            </svg>
        </ng-template>
    </div>`,
    styleUrl: './ornament-divider.css',
})
export class OrnamentDivider {
    public readonly direction = input<'up' | 'down'>('up');
}
