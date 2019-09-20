import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/optimizeProduct/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _productCategories: ProductCategory[];

  constructor() { }

  setCategories(supplier: ProductCategory[]){
    this._productCategories = supplier;
  }

  getCategories(): ProductCategory[]{
    return this._productCategories;
  }
}
