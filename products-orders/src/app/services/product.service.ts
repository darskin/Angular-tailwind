import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductData } from '../components/product-modal/product-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiUrl);
  }

  createProduct(product: ProductData): Observable<ProductData> {
    return this.http.post<ProductData>(this.apiUrl, product);
  }

  updateProduct(product: ProductData): Observable<ProductData> {
    return this.http.put<ProductData>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
