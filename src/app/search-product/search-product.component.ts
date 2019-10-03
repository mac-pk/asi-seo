import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../seo.service';
import { SearchProduct } from '../shared/models/searchProduct/SearchProduct';
import { FacetTerms } from '../shared/models/searchProduct/FacetTerms';
import { SearchFilter } from '../shared/models/searchProduct/SearchFilter';
import { EnumSeoStatus } from '../shared/models/searchProduct/EnumSeoStatus';
import { EnumProductStatus } from '../shared/models/searchProduct/EnumProductStatus';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BulkEditModalComponent } from '../modals/bulk-edit-modal/bulk-edit-modal.component';
import { EmailSupplierModalComponent } from '../modals/email-supplier-modal/email-supplier-modal.component';
import { ISupplier } from '../shared/models/searchSuppliers/ISearchSuppliers';
import { SupplierService } from '../shared/services/supplier.service';
import { SearchFilterParam } from '../shared/models/searchProduct/SearchFilterParam';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  products: SearchProduct[] = [];
  objSearchFilter: SearchFilter[] = [];
  selectedFacetTerms: FacetTerms[] = [];
  supplier: ISupplier;
  seoStatusShowAll: boolean = false;
  filterParam: SearchFilterParam[] = [];

  currPage: number = 0;
  mdlsearch: '';
  searchtxt: '';
  isLoading: boolean = false;
  showhideSearch = false;
  totalCount: number = 0;
  isExactMatch: boolean = false;
  showAll_seoStatus: boolean = false;
  seoStausEnum = EnumSeoStatus;
  productStatusEnum = EnumProductStatus;
  isSelectAll: boolean = false;
  noProductsFound: boolean = false;
  sortBy: string = 'Last Updated';
  sortByOptions: string[];

  constructor(
    private _SeoService: SeoService,
    private modalService: NgbModal,
    private router: Router,
    private supplierService: SupplierService
  ) {

  }

  ngOnInit() {
    if (this.supplierService.getSupplier()) {
      this.supplier = this.supplierService.getSupplier();
      this.getSupplierProducts(this.supplier.CompanyId);
    } else {
      this.router.navigate(['/searchSupplier']);
    }
  }

  loadProducts(products: any[]) {
    if (products.length) {
      this.products = products.map((product) => new SearchProduct(product));
      this.noProductsFound = false;
    } else
      this.noProductsFound = true;
  }

  loadFilters(filters: any[]) {
    if (filters.length) {
      this.objSearchFilter = filters.map((x) => new SearchFilter(x.Facet, x.Terms));
    }
  }

  getSupplierProducts(companyId: number, searchText: string = '', filters: SearchFilterParam[] = null, sortBy: string[] = null, offset: number = 0) {
    this.showLoader(true);

    if (offset == 0)
      this.currPage = 1;

    this._SeoService.getSuplierProducts(companyId, searchText, filters, sortBy, offset).subscribe(data => {
      if (data) {
        this.isSelectAll = false;
        this.loadProducts(data.Products);
        this.loadFilters(data.Filters);
        this.totalCount = data.TotalCount;
      }

      this.showLoader(false);
    });
  }

  navigatePage(page: any) {
    this.getSupplierProducts(this.supplier.CompanyId, '', this.filterParam, this.sortByOptions, page.startIndex ? page.startIndex : 0);
    this.currPage = +page.currentPage;
  }

  onSelectAllProducts(event) {
    this.products.forEach((x) => x.IsSelected = this.isSelectAll);
  }
  onSelectProduct(product) {
    if (this.isSelectAll)
      this.isSelectAll = false;
    else {
      if (!this.products.find(item => item.IsSelected == false)) {
        this.isSelectAll = true;
      }
    }
  }

  searchClick(arg: any) {
    if (arg) {
      this.showhideSearch = true;
      this.searchtxt = arg;
      this.mdlsearch = '';
      this.filterParam = [];
      this.selectedFacetTerms = [];
      if (this.isExactMatch)
        this.filterParam.push(new SearchFilterParam("SearchTerm", '"' + this.searchtxt + '"'));
      else
        this.filterParam.push(new SearchFilterParam("SearchTerm", this.searchtxt));
      this.applyFilter();
    }
  }
  cancelSearch() {
    this.showhideSearch = false;
    this.searchtxt = '';
    this.mdlsearch = '';
    this.filterParam.splice(this.filterParam.findIndex(item => item.FacetName === "SearchTerm"), 1);
    this.applyFilter();
  }
  cancelItem(objFaceterm: FacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if (this.selectedFacetTerms.filter(item => item.ParentTerm === objFaceterm.Term).length > 1) {
        for (var i = 0; i < this.selectedFacetTerms.length; i++) {
          if (this.selectedFacetTerms[i].ParentTerm === objFaceterm.Term) {
            this.selectedFacetTerms.splice(i, 1);
            i--;
          }
        }
        this.filterParam.splice(this.filterParam.findIndex(item => item.SearchTerm === objFaceterm.ParentTerm), 1);
        this.applyFilter();
      }
      else if (this.selectedFacetTerms.some(element => element.Term.includes(objFaceterm.Term))) {
        this.selectedFacetTerms.splice(this.selectedFacetTerms.indexOf(objFaceterm), 1);
        if (this.filterParam.some(item => item.SearchTerm === objFaceterm.ParentTerm && item.ChildTerm === objFaceterm.Term)) {
          var facetName = this.filterParam.find(item => item.SearchTerm === objFaceterm.ParentTerm && item.ChildTerm === objFaceterm.Term).FacetName;
          this.filterParam.splice(this.filterParam.findIndex(item => item.SearchTerm === objFaceterm.ParentTerm), 1);
          this.filterParam.push(new SearchFilterParam(facetName, objFaceterm.ParentTerm));
        }
        else
          this.filterParam.splice(this.filterParam.findIndex(item => item.SearchTerm === objFaceterm.Term), 1);
        this.applyFilter();
      }
    }
  }
  facetTermClick(facet: string, objFaceterm: FacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if (this.selectedFacetTerms.some(element => element.ParentTerm === objFaceterm.ParentTerm)) {
        this.selectedFacetTerms.push(objFaceterm);
        this.filterParam.splice(this.filterParam.findIndex(item => item.SearchTerm === objFaceterm.ParentTerm), 1);
        this.filterParam.push(new SearchFilterParam(facet, objFaceterm.ParentTerm, objFaceterm.Term));
      } else {
        this.selectedFacetTerms.push(objFaceterm);
        this.filterParam.push(new SearchFilterParam(facet, objFaceterm.Term))
      }
    } else {
      this.selectedFacetTerms.push(objFaceterm);
      this.filterParam.push(new SearchFilterParam(facet, objFaceterm.Term))
    }
    this.applyFilter();
  }

  openBulkEdit() {
    let options: NgbModalOptions = { backdrop: 'static', size: 'lg' };
    this.modalService.open(BulkEditModalComponent, options);
  }

  openEmailSupplier() {
    let options: NgbModalOptions = { backdrop: 'static', size: 'lg', scrollable: true, centered: true };
    const modalRef = this.modalService.open(EmailSupplierModalComponent, options);
    modalRef.componentInstance.supplier = this.supplier;
  }

  applyFilter(): void {
    this.getSupplierProducts(this.supplier.CompanyId, '', this.filterParam, this.sortByOptions, 0);
  }

  toggleSee(filter: SearchFilter): void {
    filter.SeeAll = !filter.SeeAll;
  }

  toggleSEOStatus(seeAll: boolean) {
    this.seoStatusShowAll = !seeAll;
  }

  changeSort(sortBy: string) {
    this.sortBy = sortBy;
    this.sortByOptions = [];
    this.sortByOptions.push(this.sortBy);
    this.applyFilter();
  }

  clearAll() {
    this.showhideSearch = false;
    this.searchtxt = '';
    this.mdlsearch = '';
    this.selectedFacetTerms = [];
    this.filterParam = [];
    this.sortBy = 'Last Updated';
    this.sortByOptions = [];
    this.applyFilter();
  }

  showLoader(show: boolean): void {
    this.isLoading = show;
  }

  viewProduct(externalProductId: string): void {
    localStorage.setItem('selectedExternalProductId', externalProductId);
    localStorage.setItem('searchProducts', JSON.stringify(this.products));
    this.router.navigate(['/optimizeProduct']);
  }
}
