import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/sparks',
        pathMatch: 'full',
    },
    {
        path: 'scroll',
        children: [
            {
                path: '',
                redirectTo: 'parallax',
                pathMatch: 'full',
            },
            {
                path: 'parallax',
                loadComponent: () =>
                    import('./features/cow-parallax/cow-parallax').then((m) => m.CowParallax),
            },
            {
                path: 'accordion',
                loadComponent: () =>
                    import('./features/sticky-accordion/sticky-accordion').then(
                        (m) => m.StickyAccordion,
                    ),
            },
        ],
    },
    {
        path: 'ornament',
        loadComponent: () =>
            import('./features/ornament-page/ornament-page').then((m) => m.OrnamentPage),
    },
    {
        path: 'sparks',
        loadComponent: () => import('./features/sparks-page/sparks-page').then((m) => m.SparksPage),
    },
    {
        path: 'shader',
        children: [
            {
                path: '',
                redirectTo: 'noise',
                pathMatch: 'full',
            },
            {
                path: ':type',
                loadComponent: () =>
                    import('./features/shaders-page/shaders-page').then((m) => m.ShadersPage),
            },
        ],
    },
];
