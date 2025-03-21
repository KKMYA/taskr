import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HomepageComponent } from './components/task-list/homepage.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige toutes les URL inconnues
  ];
