import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductData } from '../components/product-modal/product-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://671bf7812c842d92c381e25f.mockapi.io/api/v1/products';
  private productsSubject = new BehaviorSubject<ProductData[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialProducts();
  }

  private loadInitialProducts(): void {
    this.http.get<ProductData[]>(this.apiUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  getProducts(): Observable<ProductData[]> {
    return this.products$;
  }

  createProduct(product: ProductData): Observable<ProductData> {
    return this.http.post<ProductData>(this.apiUrl, product).pipe(
      tap(newProduct => {
        const currentProducts = this.productsSubject.getValue();
        this.productsSubject.next([...currentProducts, newProduct]);
      })
    );
  }

  updateProduct(product: ProductData): Observable<ProductData> {
    return this.http.put<ProductData>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap(updatedProduct => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        this.productsSubject.next(updatedProducts);
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.filter(p => p.id !== id);
        this.productsSubject.next(updatedProducts);
      })
    );
  }
}
