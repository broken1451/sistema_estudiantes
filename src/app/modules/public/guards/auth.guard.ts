import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router) as Router;

  if (authService.isLogged()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
