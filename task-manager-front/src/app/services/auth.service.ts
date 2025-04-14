import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = 'https://127.0.0.1:8000/api/login';
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());  // État de l'authentification

  constructor(private readonly http: HttpClient, @Inject(PLATFORM_ID) private readonly platformId: Object) {}

  // Méthode pour vérifier la présence du token et l'état de l'authentification
  private checkToken(): boolean {
    let token = null;

    // Vérifier si nous sommes dans un environnement de navigateur
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt_token');
    }

    if (token) {
      // Validation de l'expiration du token
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;
      const currentDate = new Date().getTime();
      return currentDate <= expirationDate;
    }
    return false;
  }

  // Méthode pour se connecter
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  // Méthode pour se déconnecter
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');  // Supprime le token
    }
    this.isAuthenticatedSubject.next(false);  // Met à jour l'état d'authentification
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  get isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }
}
