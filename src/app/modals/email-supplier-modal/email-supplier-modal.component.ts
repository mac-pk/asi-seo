import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailSupplier } from 'src/app/shared/models/emailSupplier/EmailSupplier';

@Component({
  selector: 'app-email-supplier-modal',
  templateUrl: './email-supplier-modal.component.html',
  styleUrls: ['./email-supplier-modal.component.css']
})
export class EmailSupplierModalComponent implements OnInit {
  @Input() supplier;
  emailSupplier: EmailSupplier;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (this.supplier) {
      this.emailSupplier = new EmailSupplier(this.supplier);
    }
  }

  close() {
    this.modal.dismiss();
  }

  clearAll() {
    this.emailSupplier.To = '';
  }

}
