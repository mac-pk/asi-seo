import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-supplier-modal',
  templateUrl: './email-supplier-modal.component.html',
  styleUrls: ['./email-supplier-modal.component.css']
})
export class EmailSupplierModalComponent implements OnInit {
  @Input() supplier;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    //console.log(this.supplier);
  }

  close() {
    this.modal.dismiss();
  }

}
