import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {
    // Initialisation de loginForm dans le constructeur
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username && password) {
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
}
