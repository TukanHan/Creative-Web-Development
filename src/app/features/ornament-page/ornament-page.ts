import { Component } from '@angular/core';
import { OrnamentDivider } from './ornament-divider/ornament-divider';

@Component({
    selector: 'app-ornament-page',
    imports: [OrnamentDivider],
    template: `<app-ornament-divider direction="up" />
        <div class="title-section">
            <app-ornament-divider direction="down" />
            <h1 class="ornament-title">Ornament Page</h1>
            <app-ornament-divider direction="up" />
        </div>
        <app-ornament-divider direction="down" />`,
    styleUrl: './ornament-page.css',
})
export class OrnamentPage {}
