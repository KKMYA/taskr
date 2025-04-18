import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [CommonModule]
})
export class HomepageComponent implements OnInit {
  tasks: any[] = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getUserTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(this.tasks)
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches :', err);
      }
    });
  }
}
