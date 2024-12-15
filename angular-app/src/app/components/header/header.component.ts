import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  username: string | null = null;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
      this.username = this.isAuthenticated ? localStorage.getItem('username') : null;

      // Verifica se o usuário é administrador
      if (this.isAuthenticated) {
        this.apiService.checkIsAdmin().subscribe({
          next: (response) => {
            this.isAdmin = response.is_admin; // Supondo que o backend retorna `{ is_admin: true/false }`
          },
          error: () => {
            this.isAdmin = false; // Caso ocorra erro, assume que não é admin
          },
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.username = null;
    this.isAuthenticated = false;
    this.router.navigateByUrl(this.router.url);
  }

  searchAllProducts(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    } else {
      alert('Por favor, insira um termo de pesquisa.');
    }
  }

  navigateToLogin(): void {
    const currentUrl = this.router.url;
    this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
  }

  navigateToAdmin(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      alert('Acesso restrito: apenas administradores podem acessar o painel.');
    }
  }
}
