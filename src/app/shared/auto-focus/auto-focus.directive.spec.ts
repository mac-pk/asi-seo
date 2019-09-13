import { AutoFocusDirective } from './auto-focus.directive';
import { ElementRef } from '@angular/core';
import { inject } from '@angular/core/testing';

describe('AutoFocusDirective', () => {
    imports: [ElementRef]
    xit(`should create`, inject([ElementRef],
        (elementRef: ElementRef) => {
          expect(elementRef).toBeTruthy();
        }));  

  xit('should create an instance', () => {
    let elementRef: ElementRef
    const directive = new AutoFocusDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});