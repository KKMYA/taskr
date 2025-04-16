import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  tasks: any[] = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getUserTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches :', err);
      }
    });
  }
}
