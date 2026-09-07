import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-ornament-divider',
    imports: [NgTemplateOutlet],
    template: ` <div class="divider-container" [class.flip]="direction() === 'down'">
        <ng-container *ngTemplateOutlet="rhombusTemplate; context: { direction: 'left' }" />
        <ng-container *ngTemplateOutlet="lintTemplate" />
        <svg class="ornament-svg" viewBox="0 0 150 50">
            <path class="ornament-path" [attr.d]="pathData" />
        </svg>
        <ng-container *ngTemplateOutlet="lintTemplate" />
        <ng-container *ngTemplateOutlet="rhombusTemplate; context: { direction: 'right' }" />

        <ng-template #lintTemplate>
            <svg class="line-svg" preserveAspectRatio="none" viewBox="0 0 100 2">
                <line x1="0" y1="0" x2="100" y2="0" />
            </svg>
        </ng-template>

        <ng-template #rhombusTemplate let-direction="direction">
            <svg class="rhombus-svg" viewBox="0 0 30 25">
                <g [attr.transform]="direction === 'left' ? 'rotate(180 15 0)' : null">
                    <path
                        d="M 0 0 
                        L 10 -12.5 
                        L 30 0 
                        L 10 12.5 
                        Z"
                    />
                </g>
            </svg>
        </ng-template>
    </div>`,
    styleUrl: './ornament-divider.css',
})
export class OrnamentDivider {
    public readonly direction = input<'up' | 'down'>('up');

    readonly pathData = `M 5 0
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
                L 145 0`;
}
