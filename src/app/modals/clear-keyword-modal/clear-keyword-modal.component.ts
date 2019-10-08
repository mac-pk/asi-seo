import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clear-keyword-modal',
  templateUrl: './clear-keyword-modal.component.html',
  styleUrls: ['./clear-keyword-modal.component.css']
})
export class ClearKeywordModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  clearKeywords() {
    this.modal.close('clear');
  }
}
