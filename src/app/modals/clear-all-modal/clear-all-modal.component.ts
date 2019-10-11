import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clear-all-modal',
  templateUrl: './clear-all-modal.component.html',
  styleUrls: ['./clear-all-modal.component.css']
})
export class ClearAllModalComponent implements OnInit {
  @Input() title;
  @Input() message;

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
