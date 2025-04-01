import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
      
    if (typeof username === 'string' && typeof password === 'string') {
      this.authService.login({ username, password }).subscribe(
        (response) => {
          console.log('User logged in successfully', response);
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
  
