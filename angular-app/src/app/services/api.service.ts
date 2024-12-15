import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api'; // Substitua pela URL correta do backend

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
    return this.http.get(`${this.apiUrl}/products/category/${category}`);
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
  getReviews(productSlug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productSlug}/reviews/`);
  }
    
  createReview(slug: string, reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${slug}/reviews/`, reviewData);
  }

  
  
  
  
  


}
