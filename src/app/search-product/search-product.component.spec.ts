import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProductComponent } from './search-product.component';
import { PageComponent } from '../shared/page/page.component';
import { LoginComponent } from '../login/login.component';
import { SearchSupplierComponent } from '../search-supplier/search-supplier.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

describe('SearchProductComponent', () => {
  let component: SearchProductComponent;
  let fixture: ComponentFixture<SearchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        AppRoutingModule
      ],
      declarations: [
        SearchProductComponent,
        PageComponent,
        LoginComponent,
        SearchSupplierComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
