import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo.service';
import { ISupplier } from '../shared/models/searchSuppliers/ISearchSuppliers';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EmailSupplierModalComponent } from '../modals/email-supplier-modal/email-supplier-modal.component';

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
  searchSupplierFrm: NgForm;

  constructor(
    private seoService: SeoService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() { }

  searchSuppliers(searchSupplierForm: NgForm): void {
    this.searchSupplierFrm = searchSupplierForm;
    this.isSearchPerformed = false;
    this.noSearchResult = false;
    this.showLoader(true);

    if (this.searchSupplierFrm.valid) {
      this.seoService.getSuppliers(this.searchText.trim()).subscribe(suppliers => {
        if (suppliers.length > 0) {
          this.suppliers = suppliers;
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
  emailSupplier(supplier: ISupplier) {
    if (supplier) {
      let options: NgbModalOptions = { backdrop: 'static', size: 'lg', scrollable: true, centered: true };
      const modalRef = this.modalService.open(EmailSupplierModalComponent, options);
      modalRef.componentInstance.supplier = supplier;

    }
  }
}
