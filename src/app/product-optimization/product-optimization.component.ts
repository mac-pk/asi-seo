import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../seo.service';
import { IOptimizeProduct } from '../shared/models/optimizeProduct/IOptimizeProduct';
import { ProductCategory } from '../shared/models/optimizeProduct/ProductCategory';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryModalComponent } from '../modals/product-category-modal/product-category-modal.component';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-product-optimization',
  templateUrl: './product-optimization.component.html',
  styleUrls: ['./product-optimization.component.css']
})
export class ProductOptimizationComponent implements OnInit {
  companyId: number;
  productId: number;
  externalProductId: string;
  product: IOptimizeProduct;
  productCategories: ProductCategory[] = [];
  selectedCategories: ProductCategory[] = [];

  constructor(
    private seoService: SeoService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public categoryService: CategoryService) {
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
      this.getProductCategories();
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

  getProductCategories() {
    this.seoService.getProductCategories().subscribe(productCategories => {
      if (productCategories) {
        this.productCategories = productCategories.map((category) => new ProductCategory(category));
        //console.log(JSON.stringify(productCategories));
      }
    });
  }

  openProductCategories() {
    let options: NgbModalOptions = { backdrop: 'static', size: 'lg', scrollable: true, centered: true };
    const productCategoryModal = this.modalService.open(ProductCategoryModalComponent, options);

    productCategoryModal.componentInstance.inputProductCategories = this.productCategories;
    productCategoryModal.result.then((result) => {
      if (result === 'success') {
        //console.log(JSON.stringify(this.categoryService.getCategories()));
      }
    });
  }

  removeCategory(categoryCode: string) {
    this.selectedCategories = this.categoryService.getCategories();

    if (this.selectedCategories.find(x => x.Code == categoryCode)) {
      let selectedCategoryIndex = this.selectedCategories.findIndex(x => x.Code == categoryCode);
      this.selectedCategories.splice(selectedCategoryIndex, 1);

      if (this.productCategories.find(x => x.Code == categoryCode)) {
        let categoryIndex = this.productCategories.findIndex(x => x.Code == categoryCode);
        this.productCategories[categoryIndex].IsSelected = false;
      }

      this.categoryService.setCategories(this.selectedCategories);
    }
  }

  saveProduct() {
    
  }
}
