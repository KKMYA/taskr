import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = 'https://127.0.0.1:8000/api/login';

  constructor(private readonly http: HttpClient) {}

  // Renvoi l'erreur 401 si aucun utilisateur correspondant aux credentials n'a été trouvé
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
}
