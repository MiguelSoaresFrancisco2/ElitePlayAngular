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
export class ProductListComponent implements OnInit {
  products: any[] = []; // Array para armazenar os produtos
  category: string = ''; // Variável para armazenar a categoria

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Inscreve-se nas mudanças de parâmetros da rota
    this.route.params.subscribe(params => {
      this.category = params['category']; // Captura a categoria da rota
      this.loadProducts(); // Chama o método para carregar os produtos
    });
  }

  loadProducts(): void {
    // Chama o serviço para obter produtos pela categoria
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