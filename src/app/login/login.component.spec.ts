import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SeoService } from '../seo.service';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ FormsModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [SeoService]
  }));

   xit('should be created', () => {
    const service: SeoService = TestBed.get(SeoService);
    expect(service).toBeTruthy();
   });

   xit('should have loginSeo function', () => {
    const service: SeoService = TestBed.get(SeoService);
    expect(service.loginSeo).toBeTruthy();
   });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
