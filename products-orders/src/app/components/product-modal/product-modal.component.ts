import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}
@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{type:string, product:ProductData}
    
  ) {
    console.log("dataa",data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Lógica para guardar o editar el productoc
    console.log("resultado de cefrrado", this.data)
    this.dialogRef.close(this.data);
  }

  deleteProduct(): void {
    // Lógica para eliminar el producto
    console.log('Producto eliminado:', this.data.product);
    this.dialogRef.close(this.data);
  }
}
