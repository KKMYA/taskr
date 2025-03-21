import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  async getTasks() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }
}
