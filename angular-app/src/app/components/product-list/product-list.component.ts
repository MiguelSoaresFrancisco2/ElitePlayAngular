import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa o FormsModule
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  category: string | null = null;
  searchQuery: string | null = null;
  filters = {
    search: '',
    category: '',
    inStock: false,
  };
  filtersActive = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      },
    });

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || null;
      this.filters.search = this.searchQuery || '';
      this.filtersActive = !!this.searchQuery;
      this.loadProducts();
    });

    this.route.params.subscribe((params) => {
      this.category = params['category'] || null;
      this.filters.category = this.category || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    // Ativa os filtros independentemente de haver ou não uma pesquisa
    this.filtersActive = true;
  
    if (this.filters.search) {
      // Busca por nome
      this.apiService.getProductsByName(this.filters.search).subscribe({
        next: (data) => {
          this.products = data;
          this.error = null;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos:', err);
          this.error = 'Erro ao buscar produtos.';
        },
      });
    } else if (this.filters.category) {
      // Busca por categoria
      this.apiService.getProductsByCategory(this.filters.category).subscribe({
        next: (data) => {
          this.products = data;
          this.error = null;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos por categoria:', err);
          this.error = 'Erro ao buscar produtos por categoria.';
        },
      });
    } else {
      // Busca todos os produtos
      this.apiService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.error = null;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos:', err);
          this.error = 'Erro ao buscar produtos.';
        },
      });
    }
  }
  applyFilters(event?: Event): void {
    if (event) event.preventDefault();
  
    // Ativa os filtros quando aplicados
    this.filtersActive = true;
  
    this.apiService.getFilteredProducts(this.filters).subscribe({
      next: (data) => {
        this.products = data;
        this.error = null;
      },
      error: (err) => {
        console.error('Erro ao aplicar filtros:', err);
        this.error = 'Erro ao aplicar filtros.';
      },
    });
  }
  
}
