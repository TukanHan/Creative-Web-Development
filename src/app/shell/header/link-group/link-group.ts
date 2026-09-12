import { Component } from '@angular/core';

@Component({
    selector: 'app-link-group',
    template: `
        <div class="main-link-wrapper">
            <ng-content select="[main-link]" />
            <span class="arrow">▾</span>
        </div>

        <div class="dropdown">
            <div class="dropdown-content">
                <ng-content select="[sub-link]" />
            </div>
        </div>
    `,
    styleUrl: './link-group.css',
})
export class LinkGroup {}
