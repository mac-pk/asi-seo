import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISeoLogin } from './shared/models/login/ILogin';
import { ISupplier } from './shared/models/searchSuppliers/ISearchSuppliers';
import { environment } from '../environments/environment';
import { OptimizeProduct } from './shared/models/optimizeProduct/OptimizeProduct';
import { SearchFilterParam } from './shared/models/searchProduct/SearchFilterParam';

@Injectable({ providedIn: 'root' })
export class SeoService {

  private loginUrl = environment.apiBaseUrl + 'login';
  private supplierUrl = environment.apiBaseUrl + 'Companies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.Message}`);

      return of(error as T);
    };
  }

  /** Log a SeoService message with the MessageService */
  private log(message: string) {
    //console.log(`SeoService: ${message}`);
  }

  getSuplierProducts(companyId: number, searchText: string, filters: SearchFilterParam[] = null, sortBy: string[] = [], offset: number = 0, limit: number = 20): Observable<any> {
    let params = new HttpParams()
      .set("companyid", companyId.toString())
      .set("offset", offset.toString())
      .set("limit", limit.toString());
    if (searchText)
      params = params.append("searchterm", searchText)
    if (filters && filters.length > 0)
      params = params.append("filters", JSON.stringify(filters));
    if (sortBy && sortBy.length > 0)
      params = params.append("SortBy", JSON.stringify(sortBy));
    return this.http.get(environment.apiBaseUrl + "SEOproducts", { params });
  };

  loginSeo(seo: ISeoLogin): Observable<any> {
    return this.http.post(this.loginUrl, seo, this.httpOptions).pipe(
      tap((seo: ISeoLogin) => this.log(`Login with username=${seo.Username}`)),
      catchError(this.handleError<any>('loginSeo'))
    );
  }

  getSuppliers(searchText: string): Observable<ISupplier[]> {
    let filters: any[] = [];
    filters.push({ searchterm: searchText });

    let params = new HttpParams()
      .set("filters", JSON.stringify(filters));

    return this.http
      .get(this.supplierUrl, { params })
      .pipe(map((response: any) => {
        return response.map(item => item.Results)[0];
      })
      );
  }

  getCurrentProduct(externalProductId: string, companyId: number): Observable<OptimizeProduct> {
    let params = new HttpParams()
    .set("companyId", companyId.toString());

    return this.http
      .get(environment.apiBaseUrl + "SEOproducts/" + externalProductId, { params })
      .pipe(map((response: any) => {
        return response;
      })
      );
  }

  getSeoProduct(externalProductId: string): Observable<OptimizeProduct> {
    return this.http
      .get(environment.seoBaseUrl + "Product/" + externalProductId)
      .pipe(map((response: any) => {
        return response;
      })
      );
  }  

  saveSeoProduct(seoProduct: OptimizeProduct): Observable<any> {
    return this.http.post(environment.seoBaseUrl + "Product", seoProduct, this.httpOptions).pipe(
      tap((seo: ISeoLogin) => this.log(`Login with username=${seo.Username}`)),
      catchError(this.handleError<any>('loginSeo'))
    );
  }

  getProductCategories(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + "lookup/categoriesList")
      .pipe(map((response: Response) => {
        return <any>response;
      }));
  }  
}
