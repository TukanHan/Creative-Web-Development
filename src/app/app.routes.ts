import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/jungle',
        pathMatch: 'full'
    },
    {
        path: 'jungle',
        loadComponent: () => import('./jungle-parallax/jungle-parallax').then(m => m.JungleParallax)
    },
    {
        path: 'firewatch',
        loadComponent: () => import('./firewatch-parallax/firewatch-parallax').then(m => m.FirewatchParallax)
    }
];
