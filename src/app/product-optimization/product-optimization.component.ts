import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../seo.service';
import { IOptimizeProduct } from '../shared/models/optimizeProduct/IOptimizeProduct';

@Component({
  selector: 'app-product-optimization',
  templateUrl: './product-optimization.component.html',
  styleUrls: ['./product-optimization.component.css']
})
export class ProductOptimizationComponent implements OnInit {
  companyId: number;
  productId: number;
  externalProductId: string;
  product: IOptimizeProduct[] = [];

  constructor(
    private seoService: SeoService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.activeRoute.queryParams.subscribe(params => {
      this.externalProductId = params['id'];
      if (!this.externalProductId)
        this.router.navigate(['/searchProduct']);

      let ids = this.externalProductId.split('-');
      this.companyId = +ids[0];
      this.productId = +ids[1];

      //console.log(this.companyId + ' prod: ' + this.productId);
    });
  }

  ngOnInit() {
    if (this.productId) {
      this.getProduct(this.productId);
    }
  }

  getProduct(productId: number) {
    this.seoService.getProduct(productId).subscribe(product => {
      if (product) {
        //console.log(JSON.stringify(product));
        this.product = product;
      }
    });
  }
}
