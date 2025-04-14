import { CanActivateFn, Router  } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('jwt_token');

  if (token) {
    // Décoder le token et vérifier sa validité
    const decodedToken: any = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;
    const currentDate = new Date().getTime();

    if (currentDate > expirationDate) {
      // Si le token est expiré, on le supprime et on redirige vers la page de login
      localStorage.removeItem('jwt_token');
      router.navigate(['/login']);
      return false;
    }

    // Si le token est valide, permettre l'accès à la route
    return true;
  }

  // Si le token n'est pas présent, rediriger vers la page de login
  router.navigate(['/login']);
  return false;
};
