import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game',
  },
  {
    path: 'game',
    loadComponent: () => import('./pages/game/game').then((c) => c.Game),
  },
];
