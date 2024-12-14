import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  notificationMessage: string | null = null;
  isError: boolean = false; // Para diferenciar notificações de sucesso e erro

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.updateCart();
  }

  incrementQuantity(productId: number): void {
    const item = this.cartItems.find((i) => i.product.id === productId);
    if (item) {
      this.cartService.addToCart(item.product, 1).subscribe({
        next: () => {
          this.updateCart();
          this.showNotification(`Quantidade de ${item.product.name} aumentada!`);
        },
        error: () => {
          this.showNotification('Erro ao atualizar a quantidade.', true);
        },
      });
    }
  }

  decrementQuantity(productId: number): void {
    const item = this.cartItems.find((i) => i.product.id === productId);
    if (item && item.quantity > 1) {
      this.cartService.updateCartItem(productId, item.quantity - 1).subscribe({
        next: () => {
          this.updateCart();
          this.showNotification(`Quantidade de ${item.product.name} reduzida!`);
        },
        error: () => {
          this.showNotification('Erro ao atualizar a quantidade.', true);
        },
      });
    } else if (item && item.quantity === 1) {
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: number): void {
    const item = this.cartItems.find((i) => i.product.id === productId);
    if (item) {
      this.cartService.removeCartItem(productId).subscribe({
        next: () => {
          this.updateCart();
          this.showNotification(`${item.product.name} removido do carrinho.`);
        },
        error: () => {
          this.showNotification('Erro ao remover o item do carrinho.', true);
        },
      });
    }
  }

  proceedToCheckout(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    } else {
      this.showNotification('Seu carrinho está vazio. Adicione itens antes de prosseguir.', true);
    }
  }

  updateCart(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.items || [];
        this.total = this.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
      error: () => {
        this.showNotification('Erro ao carregar o carrinho.', true);
      },
    });
  }

  showNotification(message: string, isError: boolean = false): void {
    this.notificationMessage = message;
    this.isError = isError;

    setTimeout(() => {
      this.notificationMessage = null;
      this.isError = false;
    }, 3000);
  }
}
