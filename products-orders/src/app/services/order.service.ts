import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderData } from '../components/order-modal/order-modal.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';
  private ordersSubject = new BehaviorSubject<OrderData[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialOrders();
  }

  private loadInitialOrders(): void {
    this.http.get<OrderData[]>(this.apiUrl).subscribe(orders => {
      this.ordersSubject.next(orders);
    });
  }

  getOrders(): Observable<OrderData[]> {
    return this.orders$;
  }

  createOrder(order: OrderData): Observable<OrderData> {
    return this.http.post<OrderData>(this.apiUrl, order).pipe(
      tap(newOrder => {
        const currentOrders = this.ordersSubject.getValue();
        this.ordersSubject.next([...currentOrders, newOrder]);
      })
    );
  }

  updateOrder(order: OrderData): Observable<OrderData> {
    return this.http.put<OrderData>(`${this.apiUrl}/${order.id}`, order).pipe(
      tap(updatedOrder => {
        const currentOrders = this.ordersSubject.getValue();
        const updatedOrders = currentOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
        this.ordersSubject.next(updatedOrders);
      })
    );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentOrders = this.ordersSubject.getValue();
        const updatedOrders = currentOrders.filter(o => o.id !== id);
        this.ordersSubject.next(updatedOrders);
      })
    );
  }
}
