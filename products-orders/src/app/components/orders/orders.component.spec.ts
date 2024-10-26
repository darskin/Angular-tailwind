import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { OrderData } from '../order-modal/order-modal.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderServiceMock: any;
  let productServiceMock: any;

  beforeEach(async () => {
    orderServiceMock = {
      orders$: of([]),
      updateOrder: jasmine.createSpy('updateOrder').and.returnValue(of({})),
      createOrder: jasmine.createSpy('createOrder').and.returnValue(of({})),
      deleteOrder: jasmine.createSpy('deleteOrder').and.returnValue(of({}))
    };

    productServiceMock = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, OrdersComponent], // Importar el componente standalone
      providers: [
        { provide: OrderService, useValue: orderServiceMock },
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    expect(orderServiceMock.orders$).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceMock.getProducts).toHaveBeenCalled();
  });

  it('should calculate total correctly', () => {
    const order: OrderData = {
      id: 1,
      customerId: 1,
      date: '2023-01-01',
      items: [
        { productId: 1, quantity: 2, price: 10 },
        { productId: 2, quantity: 1, price: 20 }
      ]
    };
    expect(component.getTotal(order)).toBe(40);
  });

  it('should return product name', () => {
    component.products = [{ id: 1, name: 'Product A', description: '', price: 0, stock: 0 }];
    expect(component.getProductName(1)).toBe('Product A');
    expect(component.getProductName(2)).toBe('Producto no encontrado');
  });
});
