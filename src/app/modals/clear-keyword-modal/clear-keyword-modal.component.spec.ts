import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearKeywordModalComponent } from './clear-keyword-modal.component';

describe('ClearKeywordModalComponent', () => {
  let component: ClearKeywordModalComponent;
  let fixture: ComponentFixture<ClearKeywordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearKeywordModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearKeywordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
