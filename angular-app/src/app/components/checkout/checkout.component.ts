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
  cartItems: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  shipping: number = 5; // Valor fixo de envio
  total: number = 0;
  payment = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Obtém os itens do carrinho
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    this.tax = this.subtotal * 0.05; // 5% de imposto
    this.total = this.subtotal + this.tax + this.shipping;
  }

  processCheckout(event: Event): void {
    event.preventDefault();

    // Validação simples da data de validade
    const [year, month] = this.payment.expirationDate.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert('The expiration date must be in the current month or in the future.');
      return;
    }

    // Simula o processamento de pagamento
    console.log('Processing payment...', this.payment);
    alert('Payment successful!');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
