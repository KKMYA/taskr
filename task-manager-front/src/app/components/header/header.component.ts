import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],  // Importer NgIf pour l'utiliser dans le template
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;  // Variable pour gérer l'état d'authentification

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    // Souscrire à l'état d'authentification via AuthService
    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;  // Mettre à jour l'état local de l'authentification
      console.log(this.isAuthenticated)
      console.log(this.authService.isAuthenticated)
    });
  }

  logout() {
    this.authService.logout();  // Appeler la méthode logout de AuthService
  }
}
