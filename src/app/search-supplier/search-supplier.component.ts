import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SeoService } from '../seo.service';
import { ISupplier } from '../shared/models/searchSuppliers/ISearchSuppliers';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-supplier',
  templateUrl: './search-supplier.component.html',
  styleUrls: ['./search-supplier.component.css']
})
export class SearchSupplierComponent implements OnInit {
  suppliers: ISupplier[] = [];
  searchText: string = '';
  isSearchPerformed: boolean = false;
  isLoading: boolean = false;
  pagedItems: any[];

  constructor(private seoService: SeoService,
    private router: Router) { }

  ngOnInit() { }

  searchSuppliers(searchSupplierForm: NgForm): void {
    this.isSearchPerformed = false;
    this.isLoading = true;

    if (searchSupplierForm.valid) {
      this.seoService.getSuppliers(this.searchText, 0).subscribe(suppliers => {
        if (suppliers.length > 0) {
          this.suppliers = suppliers;
          this.isLoading = false;
          this.pagedItems = this.suppliers;
          //console.log(JSON.stringify(this.pagedItems));
        }
      });
    }
    else {
      this.isSearchPerformed = true;
      this.isLoading = false;
      this.pagedItems = null;
    }
  }

  viewProducts(companyId): void {
    this.router.navigate(['/searchProduct'], { queryParams: { id: companyId } });
  }

  onPagerChange(pagedList: any[]) {
    this.pagedItems = pagedList;
  }
}
