import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SeoService } from '../seo.service';
import { ISupplier } from '../shared/models/searchSuppliers/ISearchSuppliers';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PagerService } from '../shared/services/pager.service';

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
  pager: any = {};
  pagedItems: any[];
  totalPages: number;
  currPage: number;  
  AllControls: boolean = false;  

  constructor(private seoService: SeoService, 
    private router : Router,
    private _Pager: PagerService,
    private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() { }

  searchSuppliers(searchSupplierForm: NgForm): void {
    this.isSearchPerformed = false;
    this.isLoading = true;

    if (searchSupplierForm.valid)
    {
      this.seoService.getSuppliers(this.searchText).subscribe(suppliers => {
        if (suppliers.length > 0) {
          this.suppliers = suppliers;
          this.isLoading = false;
  
          // paging method
          this.setPage(1);
          //console.log(this.suppliers);
        }
      });      
    }
    else
    {
      this.isSearchPerformed = true;
      this.isLoading = false;
      this.pagedItems = null;
    }
  }

  viewProducts(): void {
    this.router.navigate(['/searchProduct']);
  }  

  setPage(page: number) {
    this.pager = this._Pager.getPager(this.suppliers.length, page);
    this.totalPages = this.pager.totalPages;
    this.currPage = this.pager.currentPage;

    this.pagedItems = this.suppliers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.onSingleChange(true, 0);
  }

  onPagerChange(pageValue: number) {

    this.setPage(pageValue);
  }
  
  onSingleChange(modl: any, id: any) {

    if (this.pagedItems.length > 0) {
      if (modl) {
        let chkAllControls = true;
        for (let chkObj of this.pagedItems) {
          if (chkAllControls) {
            if (chkObj.CanBlkPblsh) {
              this.AllControls = true;
            } else {
              this.AllControls = false;
              chkAllControls = false;
            }
          }
        }
      }
      else {
        this.AllControls = false;
      }
      this.changeDetectorRef.markForCheck();
    }
  }  

}
