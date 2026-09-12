import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkGroup } from './link-group/link-group';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, LinkGroup],
    template: `
        <nav class="links">
            <a class="link" routerLink="/cow" routerLinkActive="active-link">Parallaxa</a>
            <a class="link" routerLink="/ornament" routerLinkActive="active-link">Ornamenty</a>

            <app-link-group>
                <a main-link class="link" routerLink="/shader" routerLinkActive="active-link">
                  Shadery
                </a>

                <a sub-link routerLink="/shader/noise" routerLinkActive="active-sublink">Noise</a>
                <a sub-link routerLink="/shader/smoke" routerLinkActive="active-sublink">Smoke</a>
                <a sub-link routerLink="/shader/black-hole" routerLinkActive="active-sublink">
                  Black hole
                </a>
            </app-link-group>
        </nav>
    `,
    styleUrl: './header.css',
})
export class Header {}
