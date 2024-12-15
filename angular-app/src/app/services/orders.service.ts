import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:8000/api/orders/user/'; // Endpoint para obter pedidos do usuário

  constructor(private http: HttpClient) {}

  // Obter pedidos do usuário autenticado
  getOrders(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token de autenticação
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
