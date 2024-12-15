import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-details',
  standalone: true,
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  imports: [CommonModule],

})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  order: any = null;
  items: any[] = [];
  orderDetails: any;
  

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.orderId = Number(this.route.snapshot.paramMap.get('id')); // Certifique-se de que isso é um número válido
  console.log('Order ID:', this.orderId);
  this.loadOrderDetails();
}

loadOrderDetails(): void {
  this.apiService.getOrderDetails(this.orderId).subscribe({
    next: (response) => {
      this.orderDetails = response;
    },
    error: (error) => {
      console.error('Failed to load order details:', error);
      alert('Failed to load order details.');
    },
  });
}


  goBack(): void {
    this.router.navigate(['/admin/orders']);
  }
}
