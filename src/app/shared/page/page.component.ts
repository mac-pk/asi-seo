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
  @Input() totalCount: number;
  @Output() navigate = new EventEmitter();

  constructor(private _Pager: PagerService) { }

  ngOnInit() {
    this.setPage(1);
  }

  setPage(page: number) {
    this.pager = this._Pager.getPager(this.totalCount, page);
    this.totalPages = this.pager.totalPages;
    this.currPage = this.pager.currentPage;
  }

  pageNavigate(pageValue: number) {
    if (pageValue < 1) {
      this.currPage = 1;
    }

    this.setPage(pageValue);
    this.navigate.emit(this.pager);
  }

}
