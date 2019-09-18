import { Injectable } from '@angular/core';
import { ISupplier } from '../models/searchSuppliers/ISearchSuppliers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private _supplier: ISupplier;

  constructor(
    private http: HttpClient
  ) { }

  setSupplier(supplier: ISupplier){
    this._supplier = supplier;
  }

  getSupplier(): ISupplier{
    return this._supplier;
  }
}
