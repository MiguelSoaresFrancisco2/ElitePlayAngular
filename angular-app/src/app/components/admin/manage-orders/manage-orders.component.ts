import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ManageOrdersComponent implements OnInit {

  orders: any[] = []; // Lista de encomendas

  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
        alert('Failed to load orders. Please try again.');
      },
    });
  }
navigateTo(route: string): void {
  console.log('Navigating to:', route); 
  this.router.navigate([route]);
}




}
