import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSupplierModalComponent } from './email-supplier-modal.component';

describe('EmailSupplierModalComponent', () => {
  let component: EmailSupplierModalComponent;
  let fixture: ComponentFixture<EmailSupplierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSupplierModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSupplierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
