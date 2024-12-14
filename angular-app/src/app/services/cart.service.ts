import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/cart/'; // Inclui a barra final
  private cart: any[] = [];

  constructor(private http: HttpClient) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  // Obter itens do carrinho do backend
  getCart(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obter itens armazenados localmente
  getCartItems(): any[] {
    return this.cart;
  }

  // Adicionar item ao carrinho (backend e localStorage)
  addToCart(product: any, quantity: number = 1): Observable<any> {
    const payload = { product: product.id, quantity };
    console.log('Payload enviado:', payload); // Para verificar os dados no console
    return this.http.post(this.apiUrl, { item: payload });
  }

  // Atualizar quantidade de um item no carrinho
  updateCartItem(productId: number, quantity: number): Observable<any> {
    const payload = { id: productId, quantity };
    return this.http.put(this.apiUrl, { item: payload });
  }

  // Remover item do carrinho
  removeCartItem(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}/`);
  }

  // Limpar o carrinho
  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
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
