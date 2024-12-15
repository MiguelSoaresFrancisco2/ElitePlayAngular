import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId!: number; // ID do produto a ser editado
  product = {
    name: '',
    price: 0,
    available: true,
    description: '',
    stock_quantity: 0,
  };
  submitted = false; // Para controle de validação

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(); // Chama o método para carregar os dados do produto
  }

  loadProduct(): void {
    // Chama o serviço para obter os detalhes do produto usando o productId
    this.apiService.getProduct(this.productId.toString()).subscribe({
      next: (product) => {
        this.product = product; // Atribua os dados do produto ao seu modelo
      },
      error: (error) => {
        console.error('Erro ao carregar o produto:', error);
      }
    });
  }

  saveProduct(): void {
    this.submitted = true; // Define como true ao tentar salvar
    if (this.product.name && this.product.price && this.product.stock_quantity && this.product.description) {
      // Chame o método para salvar o produto
      this.apiService.editProduct(this.productId, this.product).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/admin/manage-products']);
        },
        error: (error) => {
          console.error('Failed to update product:', error);
          alert('Failed to update product. Please try again.');
        },
      });
    }
  }
}