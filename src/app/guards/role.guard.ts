import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data?.['role'];

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && auth.getRole() !== requiredRole) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
