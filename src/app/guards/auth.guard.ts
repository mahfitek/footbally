import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('userRole');

  // login değilse
  if (!role) {
    router.navigate(['/']);
    return false;
  }

  // role-based koruma
  if (state.url.includes('player-panel') && role !== 'player') {
    router.navigate(['/']);
    return false;
  }

  if (state.url.includes('team-panel') && role !== 'team') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
