import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/cow',
        pathMatch: 'full',
    },
    {
        path: 'cow',
        loadComponent: () => import('./cow-parallax/cow-parallax').then((m) => m.CowParallax),
    },
    {
        path: 'ornament',
        loadComponent: () => import('./ornament-page/ornament-page').then((m) => m.OrnamentPage),
    },
    {
        path: 'sparks',
        loadComponent: () => import('./sparks-page/sparks-page').then((m) => m.SparksPage),
    },
    {
        path: 'shader',
        redirectTo: 'shader/noise',
        pathMatch: 'full',
    },
    {
        path: 'shader/:type',
        loadComponent: () => import('./shaders-page/shaders-page').then((m) => m.ShadersPage),
    },
];
