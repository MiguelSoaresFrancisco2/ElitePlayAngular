import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css'],
})
export class AdminStatisticsComponent implements OnInit {
  totalSales: number = 0;
  totalOrders: number = 0;
  topProduct: any = null;
  salesByProduct: any[] = [];
  salesByCategory: any[] = [];
  chart: Chart | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.apiService.getAdminStatistics().subscribe({
      next: (data) => {
        this.totalSales = data.total_sales;
        this.totalOrders = data.total_orders;
        this.topProduct = data.top_product;
        this.salesByProduct = data.sales_by_product;
        this.salesByCategory = data.sales_by_category;

        this.initChart('product');
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas:', err);
      },
    });
  }

  initChart(type: 'product' | 'category'): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    let labels: string[] = [];
    let data: number[] = [];
    let chartType: 'bar' | 'doughnut' = 'bar';

    if (type === 'product') {
      labels = this.salesByProduct.map((item) => item.product_name);
      data = this.salesByProduct.map((item) => item.total_sales);
      chartType = 'bar';
    } else if (type === 'category') {
      labels = this.salesByCategory.map((item) => item.category_name);
      data = this.salesByCategory.map((item) => item.total_sales);
      chartType = 'doughnut';
    }

    this.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: type === 'product' ? 'Sales by Product' : 'Sales by Category',
            data: data,
            backgroundColor:
              type === 'product'
                ? 'rgba(54, 162, 235, 0.5)'
                : ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
    });
  }

  updateChart(event: Event): void {
    const target = event.target as HTMLSelectElement; // Faz o cast para HTMLSelectElement
    const type = target.value; // Agora o TypeScript reconhece o "value"
    
    if (type === 'product' || type === 'category') {
      this.initChart(type);
    } else {
      console.warn('Invalid chart type:', type);
    }
  }
  
  
}
