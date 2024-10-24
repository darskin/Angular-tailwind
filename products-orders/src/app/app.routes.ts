import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    { path: 'productos', component: ProductsComponent },
    { path: 'pedidos', component: OrdersComponent },
    { path: '', redirectTo: '/pedidos', pathMatch: 'full' }
  ];