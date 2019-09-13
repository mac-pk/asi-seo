import { TestBed, async, inject } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { HttpClientModule } from '@angular/common/http';

describe('SeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it(`should create`, async(inject([SeoService],
    (seoService: SeoService) => {
      expect(seoService).toBeTruthy();
    })));

});