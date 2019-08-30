import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit-modal.component.html',
  styleUrls: ['./bulk-edit-modal.component.css']
})
export class BulkEditModalComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
