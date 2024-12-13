import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any = null;
  reviews: any[] = []
  slug: string = ''

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.apiService.getProduct(this.slug).subscribe((data) => {
      this.product = data;
    });
  }
}
