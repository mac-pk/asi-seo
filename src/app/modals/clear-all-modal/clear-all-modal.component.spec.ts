import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearAllModalComponent } from './clear-all-modal.component';

describe('ClearKeywordModalComponent', () => {
  let component: ClearAllModalComponent;
  let fixture: ComponentFixture<ClearAllModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearAllModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearAllModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
