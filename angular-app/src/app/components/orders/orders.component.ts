import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule], // Certifique-se de incluir o CommonModule
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = []; // Lista de pedidos

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (response) => {
        this.orders = response; // Atribui os pedidos retornados pelo backend
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos:', err);
      },
    });
  }
}
