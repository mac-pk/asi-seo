import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEditModalComponent } from './bulk-edit-modal.component';

describe('BulkEditModalComponent', () => {
  let component: BulkEditModalComponent;
  let fixture: ComponentFixture<BulkEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
