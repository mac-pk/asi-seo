import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupplierComponent } from './search-supplier.component';

describe('SearchSupplierComponent', () => {
  let component: SearchSupplierComponent;
  let fixture: ComponentFixture<SearchSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
