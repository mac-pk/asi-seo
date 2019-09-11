import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../seo.service';
import { SearchProduct } from '../shared/models/searchProduct/SearchProduct';
import { FacetTerms } from '../shared/models/searchProduct/FacetTerms';
import { SearchFilter } from '../shared/models/searchProduct/SearchFilter';
import { EnumSeoStatus } from '../shared/models/searchProduct/EnumSeoStatus';
import { PagerService } from '../shared/services/pager.service';
import { MyOrderByPipe } from '../shared/sort/sort.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BulkEditModalComponent } from '../modals/bulk-edit-modal/bulk-edit-modal.component';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  products: SearchProduct[] = [];
  objSearchFilter: SearchFilter[] = [];
  selectedFacetTerms: FacetTerms[] = [];
  seoStatusShowAll: boolean = false;

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  totalPages: number;
  currPage: number;
  AllControls: boolean = false;
  customorder = "Name";
  reverse = false;
  mdlsearch: '';
  searchtxt: '';
  isLoading: boolean = false;
  showhideSearch = false;
  totalCount: number = 0;
  isExactMatch: boolean = false;
  showAll_seoStatus: boolean = false;
  seoStausEnum = EnumSeoStatus;
  isSelectAll: boolean = false;
  companyId: number;

  constructor(
    private _SeoService: SeoService,
    private _Pager: PagerService,
    private orderPipe: MyOrderByPipe,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      this.companyId = params['id'];
      if (!this.companyId)
        this.router.navigate(['/searchSupplier']);
    });
  }

  ngOnInit() {
    if (this.companyId) {
      this.getSupplierProducts(this.companyId);
    }
  }

  loadProducts(products: any[]) {
    if (products.length) {
      this.products = products.map((product) => new SearchProduct(product));
    }
  }

  loadFilters(filters: any[]) {
    if (filter.length) {
      this.objSearchFilter = filters.map((x) => new SearchFilter(x.Facet, x.Terms));
    }
  }

  getSupplierProducts(companyId: number, offset: number = 0, searchText: string = '', ) {
    this.showLoader(true);

    this._SeoService.getSuplierProducts(companyId, searchText, offset).subscribe(data => {
      if (data) {
        this.loadProducts(data.Products);
        this.loadFilters(data.Filters);
        this.totalCount = data.TotalCount;
      }

      this.showLoader(false);
    });
  }

  navigatePage(page: any) {
    this.getSupplierProducts(this.companyId, page.startIndex ? page.startIndex : 0);
  }
  
  onSelectAllProducts(event) {
    this.products.forEach((x) => x.IsSelected = this.isSelectAll);
  }

  searchClick(arg: any) {
    if (arg) {
      this.showhideSearch = true;
      this.searchtxt = arg;
      this.mdlsearch = '';
    }
  }
  cancelSearch() {
    this.showhideSearch = false;
    this.searchtxt = '';
    this.mdlsearch = '';
  }
  cancelItem(objFaceterm: FacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if (this.selectedFacetTerms.some(element => element.Term.includes(objFaceterm.Term))) {
        // this.data = this.selectedFacetTerm.filter(item => item !== data_item);
        this.selectedFacetTerms.splice(this.selectedFacetTerms.indexOf(objFaceterm), 1);
      }
    }
  }
  facetTermClick(objFaceterm: FacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if (this.selectedFacetTerms.some(element => element.Term.includes(objFaceterm.Term))) {

      } else {
        this.selectedFacetTerms.push(objFaceterm);
      }
    } else {
      this.selectedFacetTerms.push(objFaceterm);
    }
  }

  openBulkEdit() {
    this.modalService.open(BulkEditModalComponent, { backdrop: 'static', size: 'lg' });
  }

  applyFilter(filterBy: string): void {

  }

  toggleSee(filter: SearchFilter): void {
    filter.SeeAll = !filter.SeeAll;
  }

  toggleSEOStatus(seeAll: boolean) {
    this.seoStatusShowAll = !seeAll;
  }

  showLoader(show: boolean): void {
    this.isLoading = show;
  }
}
