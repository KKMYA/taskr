import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('jwt_token');

    if (token) {
      // J'ajoute le token JWT à l'en-tête si il existe
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Ici on envoi la requête dans le pipeline Angular,
    // avec le token dans l'en-tête si la requête est passée à cette étape du traitement
    return next.handle(request);
  }
}
