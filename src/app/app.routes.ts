import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/cow',
        pathMatch: 'full'
    },
    {
        path: 'firewatch',
        loadComponent: () => import('./firewatch-parallax/firewatch-parallax').then(m => m.FirewatchParallax)
    },
    {
        path: 'cow',
        loadComponent: () => import('./cow-parallax/cow-parallax').then(m => m.CowParallax)
    },
    {
        path: 'ornament',
        loadComponent: () => import('./ornament-page/ornament-page').then(m => m.OrnamentPage)
    },
    {
        path: 'noise',
        loadComponent: () => import('./noise/host').then(m => m.Host)
    }
];
