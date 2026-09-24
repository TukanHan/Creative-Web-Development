import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/sparks',
        pathMatch: 'full',
    },
    {
        path: 'scroll',
        redirectTo: 'scroll/parallax',
        pathMatch: 'full',
    },
    {
        path: 'scroll/parallax',
        loadComponent: () => import('./features/cow-parallax/cow-parallax').then((m) => m.CowParallax),
    },
    {
        path: 'ornament',
        loadComponent: () => import('./features/ornament-page/ornament-page').then((m) => m.OrnamentPage),
    },
    {
        path: 'sparks',
        loadComponent: () => import('./features/sparks-page/sparks-page').then((m) => m.SparksPage),
    },
    {
        path: 'shader',
        redirectTo: 'shader/noise',
        pathMatch: 'full',
    },
    {
        path: 'shader/:type',
        loadComponent: () => import('./features/shaders-page/shaders-page').then((m) => m.ShadersPage),
    },
];
