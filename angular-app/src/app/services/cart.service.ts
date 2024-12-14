import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  getCartItems() {
    return this.cart;
  }

  addToCart(product: any, quantity: number = 1) {
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart() {
    this.cart = [];
  }

  getCartTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
