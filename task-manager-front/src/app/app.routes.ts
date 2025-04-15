import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { CguComponent } from './components/cgu/cgu.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomepageComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'terms', component: CguComponent},
    { path: 'create-account', component: AccountCreationComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige toutes les URL inconnues
  ];
