import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);  // Injecter la plateforme
  let token = null;

  // Vérifie si l'application est executée sur un navigateur
  // Permet l'accès au local storage
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('jwt_token');
  }

  if (token) {
    // Si un token existe, redirige vers la page d'accueil
    router.navigate(['/']);
    return false;  // Retourne faux pour interdire l'accès
  }

  // Si aucun token n'existe, permettre l'accès à la route en retournant true
  return true;
};
