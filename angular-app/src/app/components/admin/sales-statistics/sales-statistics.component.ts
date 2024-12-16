import { Component, OnInit } from '@angular/core';
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartTypeRegistry
} from 'chart.js';
import { ApiService } from '../../../services/api.service';

Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-sales-statistics',
  templateUrl: './sales-statistics.component.html',
  styleUrls: ['./sales-statistics.component.css']
})
export class SalesStatisticsComponent implements OnInit {
  totalSales: number = 0;
  totalOrders: number = 0;
  topProduct: any = null;
  salesByProduct: any[] = [];
  salesByCategory: any[] = [];
  salesChart: Chart | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSalesStatistics();
  }

  fetchSalesStatistics(): void {
    this.apiService.getSalesStatistics().subscribe({
      next: (data) => {
        this.totalSales = data.total_sales;
        this.totalOrders = data.total_orders;
        this.topProduct = data.top_product;
        this.salesByProduct = data.sales_by_product;
        this.salesByCategory = data.sales_by_category;

        // Inicializa o gráfico com o tipo padrão
        this.updateChart('product');
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas de vendas:', err);
      }
    });
  }

  updateChart(type: string): void {
    if (this.salesChart) {
      this.salesChart.destroy();
      this.salesChart = null;
    }

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement | null;
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    let labels: string[] = [];
    let data: number[] = [];
    let chartType: string = 'bar';

    if (type === 'product') {
      labels = this.salesByProduct.map(item => item.product_name);
      data = this.salesByProduct.map(item => item.total_sales);
      chartType = 'bar';
    } else if (type === 'category') {
      labels = this.salesByCategory.map(item => item.category_name);
      data = this.salesByCategory.map(item => item.total_sales);
      chartType = 'doughnut';
    }

    this.salesChart = new Chart(ctx, {
      type: chartType as keyof ChartTypeRegistry,
      data: {
        labels: labels,
        datasets: [
          {
            label: type === 'product' ? 'Sales by Product' : 'Sales by Category',
            data: data,
            backgroundColor: chartType === 'bar'
              ? 'rgba(54, 162, 235, 0.5)'
              : ['#ff6384', '#36a2eb', '#ffce56'],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: chartType === 'bar' ? { y: { beginAtZero: true } } : {}
      }
    });
  }

  onChartTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement && selectElement.value) {
      this.updateChart(selectElement.value);
    }
  }
}
