import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { ProductModalComponent } from '../product-modal/product-modal.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductService: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockProductService = {
      products$: of([]),
      updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of({})),
      createProduct: jasmine.createSpy('createProduct').and.returnValue(of({})),
      deleteProduct: jasmine.createSpy('deleteProduct').and.returnValue(of({})),
    };

    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ type: component.typeEdit, product: { id: 1, name: 'Product 1', description: 'Description 1', price: 100, stock: 10 } })
      })
    };

    await TestBed.configureTestingModule({
      imports: [ProductsComponent], // Importar el componente standalone
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const products = [{ id: 1, name: 'Product 1', description: 'Description 1', price: 100, stock: 10 }];
    mockProductService.products$ = of(products);
    component.ngOnInit();
    expect(component.products).toEqual(products);
  });

  it('should open modal with correct data', () => {
    const product = { id: 1, name: 'Product 1', description: 'Description 1', price: 100, stock: 10 };
    const type = component.typeEdit;
    component.openModal(product, type);
    expect(mockDialog.open).toHaveBeenCalledWith(ProductModalComponent, {
      width: '400px',
      data: { type, product }
    });
  });

  it('should handle modal result correctly', () => {
    const product = { id: 1, name: 'Product 1', description: 'Description 1', price: 100, stock: 10 };
    component.openModal(product, component.typeEdit);
    expect(mockProductService.updateProduct).toHaveBeenCalledWith(product);
  });
});
