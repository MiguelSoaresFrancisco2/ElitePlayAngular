import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Variável para armazenar o nome do usuário
  username: string | null = 'User'; // Pode ser substituído pela lógica real de autenticação

  constructor() {
    // Aqui você pode carregar informações do usuário logado (se houver um serviço de autenticação)
    this.checkUserLoggedIn();
  }

  /**
   * Verifica se o usuário está autenticado e define o username.
   * Você pode usar um serviço de autenticação aqui para obter as informações reais.
   */
  checkUserLoggedIn(): void {
    // Simule a verificação de autenticação ou use um serviço de autenticação real
    const user = localStorage.getItem('username'); // Substitua pelo serviço real
    if (user) {
      this.username = user;
    }
  }

  /**
   * Lógica para fazer logout
   */
  logout(): void {
    // Simule o logout ou use o serviço real
    console.log('Usuário desconectado.');
    localStorage.removeItem('username'); // Limpe os dados de autenticação simulados
    this.username = null; // Redefina o estado do usuário
  }
}
