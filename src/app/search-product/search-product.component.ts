import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SeoService } from '../seo.service';
import { ISearchProduct } from '../shared/models/SearchProduct/ISearchProduct';
import { IFacetTerms } from '../shared/models/SearchProduct/IFacetTerms';
import { ISearchFilter } from '../shared/models/SearchProduct/ISearchFilter';
import { PagerService } from '../shared/services/pager.service';
import { MyOrderByPipe } from '../shared/sort/sort.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  objmodel: ISearchProduct[] = [];
  objSearchFilter: ISearchFilter[] = [];
  selectedFacetTerms: IFacetTerms[] = [];

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  totalPages: number;
  currPage: number;
  AllControls: boolean = false;
  customorder = "Name";
  reverse = false;
  searchtxt: '';
  isLoading: boolean = false;
  showhideSearch = false;

  constructor(
    private _SeoService: SeoService,
    private _Pager: PagerService,
    private orderPipe: MyOrderByPipe,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._SeoService.getGeoLocationWithExternal().subscribe(data => {
      //console.log(data);
      if (data) {
        this.objmodel = data.Products;
        // paging method
        this.setPage(1);
        //console.log(this.objmodel);
      }

      this.isLoading = false;
    });

    this._SeoService.getfacetSearch(9207).subscribe(searchData => {
      if (searchData.length > 0) {
        this.objSearchFilter = searchData;

        console.log(this.objSearchFilter);
      }
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._Pager.getPager(this.objmodel.length, page);
    this.totalPages = this.pager.totalPages;
    this.currPage = this.pager.currentPage;

    // get current page of items
    this.pagedItems = this.objmodel.slice(this.pager.startIndex, this.pager.endIndex + 1);

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
  }
  cancelSearch() {
    this.showhideSearch = false;
    this.searchtxt = '';
  }
  cancelItem(objFaceterm: IFacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if(this.selectedFacetTerms.some(element => element.name.includes(objFaceterm.name))){
       // this.data = this.selectedFacetTerm.filter(item => item !== data_item);
        this.selectedFacetTerms.splice(this.selectedFacetTerms.indexOf(objFaceterm), 1);
      }
    }
  }
  facetTermClick(objFaceterm: IFacetTerms) {
    if (this.selectedFacetTerms && this.selectedFacetTerms.length > 0) {
      if (this.selectedFacetTerms.some(element => element.name.includes(objFaceterm.name))){

      } else {
        this.selectedFacetTerms.push(objFaceterm);
      }
    } else {
      this.selectedFacetTerms.push(objFaceterm);
    }
  }

  openLg(content) {
    this.modalService.open(content);
    //size: 'md modal-dialog-centered'
  }

}
