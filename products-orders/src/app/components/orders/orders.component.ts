import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order.service';
import { ProductData } from '../product-modal/product-modal.component';
import { ProductService } from '../../services/product.service';

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface OrderData {
  id: number;
  customerId: number;
  date: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  typeEdit = "edit";
  typeDelete = "delete";
  typeCreate = 'create';

  orderCreate = { id: 0, customerId: 0, date: '', items: [] };

  orders: OrderData[] = [];
  products: ProductData[] = [];

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
    this.loadProducts();
  }

  getTotal(order: OrderData): number {
    return order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  openModal(order: OrderData, type: any): void {
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '400px',
      data: { type, order },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === this.typeEdit) {
          this.orderService.updateOrder(result.order).subscribe();
        } else if (result.type === this.typeCreate) {
          const { id, ...orderWithoutId } = result.order;
          this.orderService.createOrder(orderWithoutId).subscribe();
        } else if (result.type === this.typeDelete) {
          this.orderService.deleteOrder(result.order.id).subscribe();
        }
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Producto no encontrado';
  }
}
