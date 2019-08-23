import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo.service';
import { ISupplier } from '../shared/models/searchSuppliers/ISearchSuppliers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-supplier',
  templateUrl: './search-supplier.component.html',
  styleUrls: ['./search-supplier.component.css']
})
export class SearchSupplierComponent implements OnInit {
  suppliers: ISupplier[];
  constructor(private seoService: SeoService, private router : Router) { }

  ngOnInit() {
    this.searchSuppliers();
    console.log(localStorage.getItem('userToken'));
  }

  searchSuppliers(): void {
    this.seoService.getSuppliers()
    .subscribe(suppliers => this.suppliers = suppliers);
  }

  viewProducts(): void {
    this.router.navigate(['/searchProduct']);
  }  

}
