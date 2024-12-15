import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product = {
    name: '',
    price: 0,
    available: true,
    description: '',
    stock_quantity: 0,
    category: '', // Adicionado para selecionar a categoria
  };

  categories: any[] = []; // Para armazenar as categorias carregadas

  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Método para carregar as categorias disponíveis
  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
        alert('Failed to load categories. Please try again.');
      },
    });
  }
  

  saveProduct(): void {
    const productPayload = {
      ...this.product,
      category: +this.product.category, // Converte para número, se necessário
    };
  
    this.apiService.addProduct(productPayload).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/admin/manage-products']);
      },
      error: (error) => {
        console.error('Failed to add product:', error);
        alert('Failed to add product. Please check the inputs and try again.');
      },
    });
  }
  

}
