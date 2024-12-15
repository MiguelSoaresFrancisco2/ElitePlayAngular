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
  };

  constructor(private apiService: ApiService, public router: Router) {}

  saveProduct(): void {
    if (this.product.name && this.product.price > 0 && this.product.stock_quantity >= 0) {
      this.apiService.addProduct(this.product).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/admin/manage-products']);
        },
        error: (error) => {
          console.error('Failed to add product:', error);
          alert('Failed to add product. Please check the inputs and try again.');
        },
      });
    } else {
      alert('Please fill all required fields with valid values.');
    }
  }
  
}
