import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailSupplier } from 'src/app/shared/models/emailSupplier/EmailSupplier';
import { NgForm } from '@angular/forms';
import { SupplierService } from 'src/app/shared/services/supplier.service';

@Component({
  selector: 'app-email-supplier-modal',
  templateUrl: './email-supplier-modal.component.html',
  styleUrls: ['./email-supplier-modal.component.css']
})
export class EmailSupplierModalComponent implements OnInit {
  @Input() supplier;
  emailSupplier: EmailSupplier;
  isValid: boolean = false;
  selectedTemplate: string = '';

  constructor(
    public modal: NgbActiveModal,
    public supplierService: SupplierService
  ) { }

  ngOnInit() {
    if (this.supplier) {
      this.emailSupplier = new EmailSupplier(this.supplier);
    }
  }

  initTinyMCE(): any {
    var settings = {
      menubar: false,
      plugins: 'link',
      toolbar: 'bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat'
    };

    return settings;
  }

  close() {
    this.modal.dismiss();
  }

  clearAll(option: string) {
    if (option == 'TO')
      this.emailSupplier.To = '';
    if (option == 'CC')
      this.emailSupplier.Cc = '';
    if (option == 'BCC')
      this.emailSupplier.Bcc = '';
  }

  selectTemplate(template: HTMLInputElement) {
    if (template && template.id) {
      this.selectedTemplate = template.id;
      this.emailSupplier.Body = template.innerHTML;
    } else {
      this.selectedTemplate = 'Other';
    }
  }

  send(form: NgForm) {
    if (form.valid) {
      this.isValid = true;
    } else {
      this.isValid = false;
      return;
    }

    // this.supplierService.sendEmail(this.emailSupplier).subscribe(x => {
    //   console.log(x);
    // })
  }
}
