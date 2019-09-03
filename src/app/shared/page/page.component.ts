import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { PagerService } from '../services/pager.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pager: any = {};
  totalPages: number;
  currPage: number;  
  @Input() currentList: any[];
  @Output() pagedList = new EventEmitter<any[]>();

  constructor(private _Pager: PagerService) { }

  ngOnInit() {
    this.setPage(1);
  }

  setPage(page: number) {
    this.pager = this._Pager.getPager(this.currentList.length, page);
    this.totalPages = this.pager.totalPages;
    this.currPage = this.pager.currentPage;
    this.pagedList.emit(this.currentList.slice(this.pager.startIndex, this.pager.endIndex + 1));
    //console.log(JSON.stringify(this.currentList));
  }

  onPagerChange(pageValue: number) {
    if (pageValue < 1)
    {
      this.currPage = 1;
    }

    this.setPage(pageValue);
  }   

}
