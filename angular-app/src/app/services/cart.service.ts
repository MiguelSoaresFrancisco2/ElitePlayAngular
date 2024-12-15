import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/cart/'; // URL base do endpoint do carrinho
  private cart: any[] = [];

  constructor(private http: HttpClient) {
    // Carrega o carrinho salvo no localStorage, se existir
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  // Configurar cabeçalhos com token de autenticação
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Agora 'authToken' será usado
    if (!token) {
      console.error('Token de autenticação não encontrado no localStorage.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
  }
  

  // Obter itens do carrinho do backend
  getCart(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  // Obter itens armazenados localmente
  getCartItems(): any[] {
    return this.cart;
  }

  // Adicionar item ao carrinho (backend e localStorage)
  addToCart(product: any, quantity: number): Observable<any> {
    const headers = this.getHeaders(); // Inclui o cabeçalho com o token
    const payload = {
      item: {
        product: product.id, // ID do produto
        quantity: quantity,  // Quantidade desejada
      },
    };
    console.log('Payload enviado:', payload); // Debug do payload
    return this.http.post(this.apiUrl, payload, { headers }); // POST para o endpoint do carrinho
  }

  // Atualizar quantidade de um item no carrinho
  updateCartItem(productId: number, quantity: number): Observable<any> {
    const headers = this.getHeaders(); // Inclui o cabeçalho com o token
    const payload = {
      item: {
        product: productId, // ID do produto
        quantity: quantity, // Quantidade atualizada
      },
    };
    return this.http.put(this.apiUrl, payload, { headers });
  }
  

  // Remover item do carrinho
  removeCartItem(productId: number): Observable<any> {
    const headers = this.getHeaders(); // Inclui o cabeçalho com o token
    const payload = { product_id: productId }; // Envia o ID do produto no corpo
    return this.http.delete(this.apiUrl, { headers, body: payload });
  }
  
  // Limpar o carrinho
  clearCart(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.apiUrl, { headers });
  }

  // Calcular o total dos itens do carrinho
  getCartTotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Sincronizar carrinho local com backend
  syncCart(): void {
    this.getCart().subscribe((response) => {
      this.cart = response.items || [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
    });
  }

  // Salvar carrinho localmente
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
