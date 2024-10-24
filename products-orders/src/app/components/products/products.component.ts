import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductService } from '../../services/product.service';

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
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  typeEdit="edit"
  typeDelete="delete"
  typeCreate='create'
  productCreate={ id: 0, name: '', description: '', price: 0, stock: 0 }

  products: ProductData[] = [];

  constructor(public dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  openModal(product: ProductData, type:any): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '400px',
      data: {type,product },
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("resultado",result)
      if (result) {
        if (result.type === this.typeEdit) {
          this.productService.updateProduct(result.product).subscribe(updatedProduct => {
            this.loadProducts();
          });
        } else if (result.type === this.typeCreate) {
          const { id, ...productWithoutId } = result.product;
          console.log("resultado333",productWithoutId, result.product)
          this.productService.createProduct(productWithoutId).subscribe(newProduct => {
            this.loadProducts();
          });
        } else if (result.type === this.typeDelete) {
          this.productService.deleteProduct(result.product.id).subscribe(() => {
            this.loadProducts();
          });
        }
      }
    });
  }

}
