import { Injectable } from '@angular/core';
import { ISupplier } from '../models/searchSuppliers/ISearchSuppliers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmailSupplier } from '../models/emailSupplier/EmailSupplier';
import { StorageHelper } from '../helpers/StorageHelper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private supplierApiUrl = environment.seoBaseUrl1;
  private _supplier: ISupplier;
  private localStorage =  new StorageHelper();

  httpOptions = {
    headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  setSupplier(supplier: ISupplier){
    this._supplier = supplier;
    this.localStorage.add('supplier', JSON.stringify(this._supplier));
  }

  getSupplier(): ISupplier{
    this._supplier = JSON.parse(this.localStorage.get('supplier'));
    return this._supplier;
  }
  
  sendEmail(email: EmailSupplier): Observable<any> {
    return this.http.post(this.supplierApiUrl + "/send", email, this.httpOptions);
  }
}
