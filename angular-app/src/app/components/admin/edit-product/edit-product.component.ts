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
  productId!: number;
  product = {
    name: '',
    price: 0,
    available: true,
    description: '',
    stock_quantity: 0,
  };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router // Alterado para 'public' para evitar erros no template
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.apiService.getProduct(this.productId.toString()).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => {
        console.error('Failed to load product:', error);
        alert('Failed to load product details.');
      },
    });
  }

  saveProduct(): void {
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
