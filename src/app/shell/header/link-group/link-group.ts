import { Component } from '@angular/core';

@Component({
    selector: 'app-link-group',
    template: `
        <div class="main-link-wrapper">
            <ng-content select="[main-link]" />
            <svg
                class="arrow"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
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
