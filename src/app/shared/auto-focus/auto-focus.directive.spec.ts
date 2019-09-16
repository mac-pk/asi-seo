import { AutoFocusDirective } from './auto-focus.directive';
import { ElementRef } from '@angular/core';
import { inject } from '@angular/core/testing';

describe('AutoFocusDirective', () => {
  imports: [ElementRef]
  it(`should create`, inject([ElementRef],
    (elementRef: ElementRef) => {
      expect(elementRef).toBeTruthy();
    }));

  it('should create an instance', () => {
    let elementRef: ElementRef
    const directive = new AutoFocusDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});