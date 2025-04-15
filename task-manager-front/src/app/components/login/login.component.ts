import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
      
    if (typeof email === 'string' && typeof password === 'string') {
      this.authService.login({ email, password }).subscribe(
        (response) => {
          console.log('User logged in successfully', response);
          localStorage.setItem('jwt_token', response.token);
          console.log(localStorage.getItem('jwt_token'));
          window.location.reload();
        },
        (error) => {
          console.log('Login failed', error);
        }
      );
    } else {
        console.log('Invalid form data');
      }
    }
  }
  
