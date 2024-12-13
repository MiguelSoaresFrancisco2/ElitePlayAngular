import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf
import { FormsModule } from '@angular/forms'; // Necessário para [(ngModel)]
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Define como um componente standalone
  imports: [CommonModule, FormsModule], // Importa os módulos necessários
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Campo de entrada para o nome do usuário
  password: string = ''; // Campo de entrada para a senha
  error: string | null = null; // Para exibir mensagens de erro

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Lida com o envio do formulário de login
   */
  onSubmit(): void {
    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.setToken(response.token); // Salva o token no localStorage
        this.router.navigate(['/']); // Redireciona o usuário para a página inicial
      },
      error: () => {
        this.error = 'Usuário ou senha incorretos.'; // Exibe mensagem de erro em caso de falha
      },
    });
  }
}
