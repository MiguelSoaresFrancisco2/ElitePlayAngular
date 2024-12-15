import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.apiService.checkIsAdmin().subscribe({
        next: (response) => {
          if (response.is_admin) {
            resolve(true); // Permite acesso
          } else {
            this.router.navigate(['/']); // Redireciona para a página inicial
            resolve(false); // Bloqueia acesso
          }
        },
        error: () => {
          this.router.navigate(['/']); // Redireciona em caso de erro
          resolve(false); // Bloqueia acesso
        },
      });
    });
  }
}
