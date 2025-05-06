import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TruncatePipeDescription } from '../../pipes/truncatedescription.pipe';
import { TruncatePipeTitle } from '../../pipes/truncatetitle.pipe';
import { TaskDetailsModalComponent } from '../../task-details-modal/task-details-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [CommonModule, TruncatePipeDescription, TruncatePipeTitle, TaskDetailsModalComponent]
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

  selectedTask: any = null;

openModal(task: any) {
  this.selectedTask = task;
}

}
