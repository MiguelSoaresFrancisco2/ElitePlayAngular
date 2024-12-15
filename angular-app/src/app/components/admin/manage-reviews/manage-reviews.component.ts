import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = []; // Lista de avaliações

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.apiService.getAllReviews().subscribe({
      next: (response) => {
        console.log('Reviews carregadas:', response); // Debug no console
        this.reviews = response;
      },
      error: (error) => {
        console.error('Erro ao carregar reviews:', error); // Debug no console
        alert('Failed to load reviews. Please try again.');
      },
    });
  }
  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }
}
