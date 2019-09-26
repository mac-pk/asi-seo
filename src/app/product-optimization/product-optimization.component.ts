import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../seo.service';
import { OptimizeProduct } from '../shared/models/optimizeProduct/OptimizeProduct';
import { ProductCategory } from '../shared/models/optimizeProduct/ProductCategory';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryModalComponent } from '../modals/product-category-modal/product-category-modal.component';
import { CategoryService } from '../shared/services/category.service';
import { IProductKeywords } from '../shared/models/optimizeProduct/IProductKeywords';
import { SearchProduct } from '../shared/models/searchProduct/SearchProduct';
import { SupplierService } from '../shared/services/supplier.service';
import { ISupplier } from '../shared/models/searchSuppliers/ISearchSuppliers';

@Component({
  selector: 'app-product-optimization',
  templateUrl: './product-optimization.component.html',
  styleUrls: ['./product-optimization.component.css']
})
export class ProductOptimizationComponent implements OnInit {
  isLoading: boolean;
  externalProductId: string;
  currentProduct: OptimizeProduct;
  seoProduct: OptimizeProduct;
  supplier: ISupplier;
  productKeywords: string;
  hasProductThemes: boolean;
  hasNextProduct: boolean;
  hasPreviousProduct: boolean;
  isNextOrPreviousClick: boolean;

  allExternalProductIds: string[] = [];
  productCategories: ProductCategory[] = [];
  selectedCategories: ProductCategory[] = [];
  searchProducts: SearchProduct[] = [];

  constructor(
    private seoService: SeoService,
    private router: Router,
    private modalService: NgbModal,
    public categoryService: CategoryService,
    private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplier = this.supplierService.getSupplier();
    this.populateProductsData();
    this.getAllCategories();
  }

  populateProductsData() {
    this.searchProducts = JSON.parse(localStorage.getItem('searchProducts')).map((products) => new SearchProduct(products));

    this.allExternalProductIds = this.searchProducts.map((product) => product.ExternalProductId).toString().split(',');

    if (!this.isNextOrPreviousClick) {
      this.externalProductId = localStorage.getItem('selectedExternalProductId');

      let currentIndex = this.allExternalProductIds.indexOf(this.externalProductId);

      this.hasNextOrPreviousProduct(currentIndex);
    }

    this.isLoading = true;
    this.getCurrentProduct(this.externalProductId);
    this.getSeoProduct(this.externalProductId);
  }

  getSeoProduct(productId: string) {
    // this will fetch product from seo database and if not present there then it will load default values based on current data
    //this.seoProduct = this.currentProduct;
  }

  getCurrentProduct(productId: string) {
    this.seoService.getProduct(productId, this.supplier.CompanyId).subscribe(product => {
      if (product) {
        let filteredProduct = this.searchProducts.filter(function (product) {
          return product.ExternalProductId == productId;
        });

        if ("ProductThemes" in product) {
          this.hasProductThemes = true;
        }

        product.Number = filteredProduct[0].Name;
        product.PrimaryImageUrl = filteredProduct[0].PrimaryImageUrl;
        this.currentProduct = product;
        this.seoProduct = product; // remove it once seo product is fetch from our api
        this.loadProductCategories(product.ProductCategories);
        this.loadProductKeywords(product.ProductKeywords);
        this.isLoading = false;
      }
    });
  }

  loadProductCategories(categories: any[]) {
    if (categories.length > 0) {
      this.currentProduct.ProductCategories = categories.map((categories) => new ProductCategory(categories)).sort((a, b) => b.Type && b.Type.localeCompare(a.Type));
    }
  }

  loadProductKeywords(keywords: IProductKeywords[]) {
    if (keywords.length > 0) {
      this.productKeywords = keywords.map((keywords) => keywords.Value).toString();
    }
  }

  getNextOrPreviousProduct(isNextProduct: boolean) {
    let currentIndex = this.allExternalProductIds.indexOf(this.externalProductId);

    if (isNextProduct) {
      this.hasNextOrPreviousProduct(currentIndex + 1);
      this.externalProductId = this.allExternalProductIds[currentIndex + 1];
    }
    else {
      this.hasNextOrPreviousProduct(currentIndex - 1);
      this.externalProductId = this.allExternalProductIds[currentIndex - 1];
    }

    this.populateProductsData();
    this.router.navigate(['/optimizeProduct']);
  }

  hasNextOrPreviousProduct(index: number) {
    this.hasPreviousProduct = false;
    this.hasNextProduct = false;
    this.isNextOrPreviousClick = true;

    if (this.allExternalProductIds[index - 1]) {
      this.hasPreviousProduct = true;
    }

    if (this.allExternalProductIds[index + 1]) {
      this.hasNextProduct = true;
    }
  }

  getAllCategories() {
    this.seoService.getProductCategories().subscribe(productCategories => {
      if (productCategories) {
        this.productCategories = productCategories.map((category) => new ProductCategory(category));
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
