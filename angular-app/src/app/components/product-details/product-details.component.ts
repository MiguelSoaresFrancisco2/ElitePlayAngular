
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionar FormsModule
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  reviews: any[] = [];
  quantity: number = 1;
  reviewText: string = '';
  reviewRating: number = 0;
  isAuthenticated: boolean = false;
  username: string | null = null;
  notificationMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productSlug = this.route.snapshot.paramMap.get('slug'); // Assume que o slug está na rota
    if (productSlug) {
      this.apiService.getProduct(productSlug).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Erro ao carregar o produto:', err);
        },
      });

      // Carregar as reviews
      this.apiService.getReviews(productSlug).subscribe({
        next: (data) => {
          this.reviews = data;
        },
        error: (err) => {
          console.error('Erro ao carregar reviews:', err);
        },
      });
    } else {
      console.error('Nenhum slug de produto encontrado na rota.');
    }

    // Verificar autenticação
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.username = localStorage.getItem('username');
    }
  }

  submitReview(): void {
    if (!this.isAuthenticated) {
      alert('Você precisa estar logado para enviar uma review.');
      this.router.navigate(['/login']);
      return;
    }
  
    const reviewData = {
      author: this.username, // Usa o nome do usuário logado
      text: this.reviewText,
      rating: this.reviewRating,
    };
  
    this.apiService.createReview(this.product.slug, reviewData).subscribe({
      next: (data) => {
        this.reviews.push(data); // Adiciona a nova review na lista
        this.reviewText = '';
        this.reviewRating = 0;
        this.showNotification(`Review foi enviada!`);
      },
      error: (err) => {
        console.error('Erro ao adicionar review:', err);
        alert('Erro ao adicionar a review. Tente novamente.');
      },
    });
  }
  

  addToCart() {
    if (this.quantity > 0) {
      this.cartService.addToCart(this.product, this.quantity);
      this.showNotification(`${this.quantity} ${this.product.name}(s) foram adicionados ao carrinho!`);
    } else {
      this.showNotification('Por favor, insira uma quantidade válida.', true);
    }
  }
  
  showNotification(message: string, isError: boolean = false): void {
    this.notificationMessage = message;
  
    // Altere a cor se for um erro
    if (isError) {
      document.querySelector('.notification')?.classList.add('error');
    }
  
    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000); // Oculta a mensagem após 3 segundos
  }

  navigateToLogin(): void {
    const currentUrl = this.router.url; // Captura o URL atual
    this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
  }
}
