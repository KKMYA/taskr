import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);  // Injecter la plateforme
  let token = null;

  // Vérifie si l'application est executée sur un navigateur
  // Permet l'accès au local storage car sinon la vérification du token s'effectue au rendu serveur 
  // et le localStorage n'est pas encore disponible
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('jwt_token');
  }

  if (route.routeConfig?.path === 'login' && token) {
    // Si un token existe, redirige vers la page d'accueil
    router.navigate(['/']);
    return false;  // Retourne faux pour interdire l'accès
  }

  if (route.routeConfig?.path === '' && !token) {
    router.navigate(['/login']);
    return false;
  }

  // Si aucun token n'existe, permettre l'accès à la route en retournant true
  return true;
};
