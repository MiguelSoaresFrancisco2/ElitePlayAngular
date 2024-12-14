import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], // Adiciona o CommonModule aqui
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  incrementQuantity(productId: number): void {
    const item = this.cartItems.find((i) => i.id === productId);
    if (item) {
      this.cartService.addToCart(item, 1); // Adiciona mais 1 ao carrinho
      this.updateCart();
    }
  }

  decrementQuantity(productId: number): void {
    const item = this.cartItems.find((i) => i.id === productId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(productId, item.quantity - 1); // Remove 1 da quantidade
      this.updateCart();
    } else if (item && item.quantity === 1) {
      this.removeFromCart(productId); // Remove item se quantidade for 1
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }
}
