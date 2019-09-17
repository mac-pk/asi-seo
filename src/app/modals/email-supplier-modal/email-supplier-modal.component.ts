import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-supplier-modal',
  templateUrl: './email-supplier-modal.component.html',
  styleUrls: ['./email-supplier-modal.component.css']
})
export class EmailSupplierModalComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
