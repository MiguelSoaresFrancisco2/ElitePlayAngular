import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  notificationMessage: string | null = null;
  cartItems: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  payment = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };
  isError: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.items || [];
        this.calculateTotals();
      },
      error: () => {
        console.error('Erro ao carregar os itens do carrinho.');
      },
    });
  }
  

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    
    this.total = this.subtotal ;
  }
  

  processCheckout(event: Event): void {
    event.preventDefault();
  
    // Validação da data de validade
    const [year, month] = this.payment.expirationDate.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
  
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      this.showNotification('The expiration date must be in the current month or in the future.', true);
      return;
    }
  
    // Processar pagamento e criar ordem
    this.cartService.createOrder().subscribe({
      next: () => {
        this.showNotification('Order placed successfully!');
        this.cartService.clearCart().subscribe(() => {
          this.router.navigate(['/orders']); // Redireciona para a página "My Orders"
        });
      },
      error: () => {
        this.showNotification('Failed to place the order. Please try again.', true);
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
