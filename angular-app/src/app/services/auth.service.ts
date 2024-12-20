import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://neorabbit.pythonanywhere.com/api'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());


  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response.token); // Supondo que o token vem na resposta
        this.isAuthenticatedSubject.next(true); // Atualiza o estado de autenticação
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Use 'authToken' como chave
    this.isAuthenticatedSubject.next(false); // Atualiza o estado de autenticação
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token); // Use 'authToken' como chave
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Use 'authToken' como chave
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
