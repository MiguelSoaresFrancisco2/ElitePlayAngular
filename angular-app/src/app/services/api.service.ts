import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://neorabbit.pythonanywhere.com/api'; // Substitua pela URL correta do backend

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/`);
  }
  
  getProduct(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${slug}/`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`);
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/`);
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/`, orderData);
  }
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/category/${category}/`);
  }

  getProductsByName(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/search/`, { params: { search: query } });
  }
  
  getFilteredProducts(filters: { search: string; category: string; inStock: boolean }): Observable<any> {
    let params: any = {};
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.inStock) params.inStock = filters.inStock.toString();
  
    return this.http.get(`${this.apiUrl}/products/`, { params });
  }
  getReviews(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}/reviews/`);
  }
    
  createReview(productId: number, reviewData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  
    return this.http.post(`${this.apiUrl}/products/${productId}/reviews/`, reviewData, { headers });
  }
  

  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    };
    return this.http.post(`${this.apiUrl}/products/add/`, product, { headers });
  }


  
  editProduct(productId: number, product: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    };
    return this.http.put(`${this.apiUrl}/products/update/${productId}/`, product, { headers });
}


  deleteProduct(productId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return this.http.delete(`${this.apiUrl}/products/delete/${productId}/`, {
      headers,
    });
  }
  
  
  
  checkIsAdmin(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    const headers = {
      Authorization: `Token ${token}`,
    };
    return this.http.get<any>('http://localhost:8000/api/check-admin/', { headers });
  }
  
  
  
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/id/${productId}/`);
}


getAllReviews(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/reviews/`);
}

getOrders(): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Token ${token}`,
  };
  return this.http.get(`${this.apiUrl}/orders/admin/`, { headers });
}
getOrderDetails(orderId: string | number): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  };
  return this.http.get(`${this.apiUrl}/orders/${orderId}/`, { headers });
}


getSalesStatistics(): Observable<any> {
  const token = localStorage.getItem('authToken'); // Obtém o token armazenado
  const headers = {
    Authorization: `Token ${token}`, // Adiciona o token ao cabeçalho
  };
  return this.http.get(`${this.apiUrl}/admin/statistics/`, { headers });
}


}
