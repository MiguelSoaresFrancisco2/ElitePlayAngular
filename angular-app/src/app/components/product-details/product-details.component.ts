import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  reviews: any[] = [];
  quantity: number = 1;
  reviewText: string = '';
  reviewRating: number = 0;
  isAuthenticated: boolean = false;
  username: string | null = null;
  notificationMessage: string | null = null;
  isError: boolean = false; // Propriedade adicionada para gerenciar estado de erro

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productSlug = this.route.snapshot.paramMap.get('slug');
    if (productSlug) {
      this.loadProductDetails(productSlug);
      this.loadReviews(productSlug);
    }

    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.username = localStorage.getItem('username');
    }
  }

  loadProductDetails(slug: string): void {
    this.apiService.getProduct(slug).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.showNotification('Erro ao carregar o produto.', true);
        console.error('Erro ao carregar o produto:', err);
      },
    });
  }

  loadReviews(slug: string): void {
    this.apiService.getReviews(slug).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        this.showNotification('Erro ao carregar reviews.', true);
        console.error('Erro ao carregar reviews:', err);
      },
    });
  }

  addToCart(): void {
    if (this.quantity > 0) {
      this.cartService.addToCart(this.product, this.quantity).subscribe({
        next: () => {
          this.showNotification(`${this.quantity} ${this.product.name}(s) adicionados ao carrinho!`);
        },
        error: (err) => {
          this.showNotification('Erro ao adicionar ao carrinho.', true);
          console.error('Erro ao adicionar ao carrinho:', err);
        },
      });
    } else {
      this.showNotification('Por favor, insira uma quantidade válida.', true);
    }
  }
  
  

  submitReview(): void {
    if (!this.isAuthenticated) {
      alert('Você precisa estar logado para enviar uma review.');
      this.router.navigate(['/login']);
      return;
    }

    const reviewData = {
      author: this.username,
      text: this.reviewText,
      rating: this.reviewRating,
    };

    this.apiService.createReview(this.product.slug, reviewData).subscribe({
      next: (data) => {
        this.reviews.push(data);
        this.reviewText = '';
        this.reviewRating = 0;
        this.showNotification('Review enviada com sucesso!');
      },
      error: (err) => {
        this.showNotification('Erro ao enviar a review.', true);
        console.error('Erro ao enviar a review:', err);
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

  navigateToLogin(): void {
    const currentUrl = this.router.url;
    this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
  }
}
