import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SeoService } from '../seo.service';
import { ISearchProduct } from '../shared/models/SearchProduct/ISearchProduct';
import { IFacetTerms } from '../shared/models/SearchProduct/IFacetTerms';
import { ISearchFilter } from '../shared/models/SearchProduct/ISearchFilter';
import { EnumSeoStatus } from '../shared/models/searchProduct/EnumSeoStatus';
import { PagerService } from '../shared/services/pager.service';
import { MyOrderByPipe } from '../shared/sort/sort.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BulkEditModalComponent } from '../modals/bulk-edit-modal/bulk-edit-modal.component';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  products: ISearchProduct[] = [];
  objSearchFilter: ISearchFilter[] = [];
  selectedFacetTerms: IFacetTerms[] = [];
  filtersShouAll: any = [];

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

  constructor(
    private _SeoService: SeoService,
    private _Pager: PagerService,
    private orderPipe: MyOrderByPipe,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._SeoService.getSuplierProducts().subscribe(data => {
      if (data) {
        this.products = data.Products;
        this.objSearchFilter = data.Filters;
        this.totalCount = data.TotalCount;
        // paging method
        this.setPage(1);
        //console.log(this.objmodel);
      }

      this.isLoading = false;
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._Pager.getPager(this.products.length, page);
    this.totalPages = this.pager.totalPages;
    this.currPage = this.pager.currentPage;

    // get current page of items
    this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.onSingleChange(true, 0);
  }

  onPagerChange(pageValue: string) {
    this.setPage(parseInt(pageValue));
  }
  onFilterChange(values: any) {

    if (this.pagedItems.length > 0) {
      if (values.currentTarget.checked) {
        for (let chkObj of this.pagedItems) {
          chkObj.CanBlkPblsh = true;
        }
      }
      else {
        for (let chkObj of this.pagedItems) {
          chkObj.CanBlkPblsh = false;
        }

      }
    }
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

  searchClick(arg: any) {
    this.showhideSearch = true;
    this.searchtxt = arg;
    this.mdlsearch = '';
  }
  cancelSearch() {
    this.showhideSearch = false;
    this.searchtxt = '';
    this.mdlsearch = '';
  }
  cancelItem(objFaceterm: IFacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if (this.selectedFacetTerms.some(element => element.Term.includes(objFaceterm.Term))) {
        // this.data = this.selectedFacetTerm.filter(item => item !== data_item);
        this.selectedFacetTerms.splice(this.selectedFacetTerms.indexOf(objFaceterm), 1);
      }
    }
  }
  facetTermClick(objFaceterm: IFacetTerms) {
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

  getFilterId(filter: string): string {
    return filter.replace(/\s/g, "_");
  }

  applyFilter(filterBy: string): void {

  }

  see(parent: string, showAll: boolean): void {
    var obj = this.filtersShouAll.find(x => x.name == this.getFilterId(parent))
    if (obj) {
      if (showAll) obj.value = true;
      else obj.value = false;
    }
    else {
      this.filtersShouAll.push({ name: this.getFilterId(parent), value: showAll ? true : false })
    }
  }

  isShowAll(filter: string): boolean {
    var obj = this.filtersShouAll.find(x => x.name == this.getFilterId(filter))
    if (obj) {
      return obj.value;
    }
    return false;
  }
}
