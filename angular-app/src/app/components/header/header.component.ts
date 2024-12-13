import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string | null = null; // Inicialmente nulo
  isAuthenticated: boolean = false; // Estado de autenticação

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Inscreva-se nas mudanças de autenticação
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
      this.username = this.isAuthenticated ? localStorage.getItem('username') : null; // Atualiza o nome do usuário
    });
  }

  logout(): void {
    this.authService.logout(); // Chama o método de logout do AuthService
    this.username = null; // Redefine o nome do usuário
  }
}