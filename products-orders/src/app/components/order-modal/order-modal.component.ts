import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../../services/product.service';
import { ProductData } from '../product-modal/product-modal.component';


export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderData{
  id: number;
  customerId: number;
  date: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.css'
})
export class OrderModalComponent {
  products: ProductData[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, order: OrderData },
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.data);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteOrder(): void {
    this.dialogRef.close(this.data);
  }

  addItem(): void {
    this.data.order.items.push({productId: 0, quantity: 0, price: 0 });
  }

  removeItem(index: number): void {
    this.data.order.items.splice(index, 1);
  }

  updatePrice(item: OrderItem, productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      item.price = product.price;
    }
  }
}

