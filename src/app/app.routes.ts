import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/jungle',
        pathMatch: 'full'
    },
    {
        path: 'firewatch',
        loadComponent: () => import('./firewatch-parallax/firewatch-parallax').then(m => m.FirewatchParallax)
    },
    {
        path: 'cow',
        loadComponent: () => import('./cow-parallax/cow-parallax').then(m => m.CowParallax)
    }
];
