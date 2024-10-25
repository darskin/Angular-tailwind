import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';

interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  typeEdit = "edit";
  typeDelete = "delete";
  typeCreate = 'create';
  productCreate = { id: 0, name: '', description: '', price: 0, stock: 0 };

  products: ProductData[] = [];

  constructor(public dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
    });
  }

  openModal(product: ProductData, type: any): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '400px',
      data: { type, product },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === this.typeEdit) {
          this.productService.updateProduct(result.product).subscribe();
        } else if (result.type === this.typeCreate) {
          const { id, ...productWithoutId } = result.product;
          this.productService.createProduct(productWithoutId).subscribe();
        } else if (result.type === this.typeDelete) {
          this.productService.deleteProduct(result.product.id).subscribe();
        }
      }
    });
  }
}
