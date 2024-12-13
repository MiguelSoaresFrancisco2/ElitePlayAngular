import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit { // Implementa OnInit
  products: any[] = [];
  category: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category']; // Captura a categoria da rota
    this.loadProducts(); // Chama o método para carregar os produtos
  }

  loadProducts(): void {
    this.apiService.getProductsByCategory(this.category).subscribe({
      next: (data) => {
        this.products = data; // Supondo que a API retorne os produtos da categoria
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error); // Tratamento de erro
      }
  });
  }
}