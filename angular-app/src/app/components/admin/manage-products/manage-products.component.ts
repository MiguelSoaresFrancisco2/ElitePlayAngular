import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common'; // Importação do CommonModule para pipes como currency

@Component({
  selector: 'app-manage-products',
  standalone: true, // Para componentes standalone
  imports: [CommonModule], // Importação necessária para o pipe currency
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any[] = []; // Lista de produtos

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (response) => {
        this.products = response; // Certifique-se de que "response" é uma lista de produtos
      },
      error: (error) => {
        console.error('Failed to load products:', error);
      },
    });
  }

  addProduct(): void {
    this.router.navigate(['/admin/add-product']); // Navega para adicionar produto
  }

  editProduct(productId: number): void {
    this.router.navigate([`/admin/edit-product/${productId}`]); // Navega para editar produto
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts(); // Recarrega a lista após a exclusão
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
          alert('Failed to delete the product. Please try again.');
        },
      });
    }
  }
  
  
  
}
