import { Component, OnInit } from '@angular/core';
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
  noSearchResult: boolean = false;
  totalCount: number = 0;
  currPage: number = 0;
  searchSupplierFrm: NgForm;

  constructor(private seoService: SeoService,
    private router: Router) { }

  ngOnInit() { }

  searchSuppliers(searchSupplierForm: NgForm, offset: number = 0): void {
    this.searchSupplierFrm = searchSupplierForm;
    this.isSearchPerformed = false;
    this.noSearchResult = false;
    this.showLoader(true);

    if (offset == 0)
    {
      this.currPage = 1;
    }

    if (this.searchSupplierFrm.valid) {
      this.seoService.getSuppliers(this.searchText.trim(), offset).subscribe(suppliers => {
        if (suppliers.length > 0) {
          this.suppliers = suppliers;
          this.totalCount = 36 // this will be returned by the api;
        }
        else {
          this.noSearchResult = true;
          this.suppliers = null;
        }
        this.showLoader(false);
      });
    }
    else {
      this.isSearchPerformed = true;
      this.showLoader(false);
      this.suppliers = null;
    }
  }

  viewProducts(companyId): void {
    this.router.navigate(['/searchProduct'], { queryParams: { id: companyId } });
  }

  showLoader(show: boolean): void {
    this.isLoading = show;
  }

  navigatePage(page: any) {
    this.searchSuppliers(this.searchSupplierFrm, page.startIndex ? page.startIndex : 0);
    this.currPage = +page.currentPage;
  }
}
