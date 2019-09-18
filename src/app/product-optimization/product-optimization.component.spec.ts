import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptimizationComponent } from './product-optimization.component';

describe('ProductOptimizationComponent', () => {
  let component: ProductOptimizationComponent;
  let fixture: ComponentFixture<ProductOptimizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptimizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
