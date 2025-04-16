import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:8000/api/tasks';

  constructor(private readonly http: HttpClient) {}

  getUserTasks(): Observable<any> {
    const token = localStorage.getItem('jwt_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log(token);
    console.log(headers);

    return this.http.get(this.apiUrl, { headers });
  }
}
