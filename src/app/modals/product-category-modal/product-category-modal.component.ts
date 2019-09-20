import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/shared/models/optimizeProduct/ProductCategory';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-category-modal',
  templateUrl: './product-category-modal.component.html',
  styleUrls: ['./product-category-modal.component.css']
})
export class ProductCategoryModalComponent implements OnInit {
  @Input() inputProductCategories;
  productCategories: ProductCategory[] = [];
  allProductCategories: ProductCategory[] = [];
  selectedCategoryCount: number = 0;
  isSelectCategoryTypeView: boolean = false;
  isProductType: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.isSelectCategoryTypeView = true;
  }

  close() {
    this.modal.dismiss();
  }

  showCategories(isProductType: boolean) {
    this.isProductType = isProductType;
    this.isSelectCategoryTypeView = false;
    this.populateCategories();
  }

  populateCategories() {
    if (this.inputProductCategories) {
      this.productCategories = this.inputProductCategories;
      this.allProductCategories = this.inputProductCategories;

      let allProductTypeCategories = this.allProductCategories.filter(x => x.IsSelected && x.IsProductCategoryType);
      let allEitTypeCategories = this.allProductCategories.filter(x => x.IsSelected && !x.IsProductCategoryType);

      if ((this.isProductType && allProductTypeCategories.length < 2) || (!this.isProductType && allEitTypeCategories.length < 5)) {
        this.isProductCategoriesDisabled(this.allProductCategories.filter(x => !x.IsSelected), false);
      }

      if (this.isProductType) {
        this.selectedCategoryCount = allProductTypeCategories.length;
        this.isProductCategoriesDisabled(allProductTypeCategories, false);
        this.isProductCategoriesDisabled(allEitTypeCategories, true);
      }
      else {
        this.selectedCategoryCount = allEitTypeCategories.length;
        this.isProductCategoriesDisabled(allProductTypeCategories, true);
        this.isProductCategoriesDisabled(allEitTypeCategories, false);
      }
    }
  }

  onCategoryChecked(productCategory: ProductCategory) {
    let productCategories = this.productCategories.filter(x => !x.IsSelected);
    //let allProductTypeCategories = this.productCategories.filter(x => x.IsSelected && x.IsProductCategoryType);
    //let allEitTypeCategories = this.productCategories.filter(x => x.IsSelected && !x.IsProductCategoryType);

    productCategory.IsProductCategoryType = this.isProductType;

    if (productCategory.IsSelected) {
      this.selectedCategoryCount += 1;
    } else {
      this.selectedCategoryCount -= 1;
    }

    if (this.isProductType) {
      if (this.selectedCategoryCount > 1) {
        this.isProductCategoriesDisabled(productCategories, true);
      }
      else {
        this.isProductCategoriesDisabled(productCategories, false);
      }
    }
    else {
      if (this.selectedCategoryCount > 4) {
        this.isProductCategoriesDisabled(productCategories, true);
      }
      else {
        this.isProductCategoriesDisabled(productCategories, false);
      }
    }

  }

  isProductCategoriesDisabled(productCategories: ProductCategory[], isDisabled: boolean) {
    //let uncheckedProductCategories = this.productCategories.filter(x => !x.IsSelected);
    productCategories.map(function (x) {
      x.IsDisabled = isDisabled;
    });
  }

  applyCategories() {
    this.onSearchChange("");
    this.categoryService.setCategories(this.productCategories.filter(x => x.IsSelected));
    this.modal.close('success');
  }

  onSearchChange(searchText: string) {
    let selectedCategories = this.productCategories.filter(x => x.IsSelected);
    debugger;

    for (var i = 0; i < selectedCategories.length; i++) {
      let index = this.allProductCategories.findIndex(x => x.Code === selectedCategories[i].Code);
      this.allProductCategories[index].IsSelected = true;
    }

    this.productCategories = this.allProductCategories;
    this.productCategories = this.filterByValue(this.productCategories, searchText);
  }

  filterByValue(array: ProductCategory[], value) {
    return array.filter((data) => JSON.stringify(data.Name).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
