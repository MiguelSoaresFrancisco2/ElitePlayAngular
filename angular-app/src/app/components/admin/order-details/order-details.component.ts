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
  order: any = null; // Variável principal para armazenar os dados do pedido

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtém o ID da encomenda a partir da rota
    this.orderId = Number(this.route.snapshot.paramMap.get('id')); 
    console.log('Order ID:', this.orderId);
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.apiService.getOrderDetails(this.orderId).subscribe({
      next: (response) => {
        this.order = response;
        console.log('Order Details:', this.order); // Verifique os dados recebidos
      },
      error: (error) => {
        console.error('Erro ao buscar detalhes do pedido:', error);
        alert('Erro ao carregar detalhes do pedido.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/orders']);
  }
}
