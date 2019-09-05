import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { ISeoLogin, ISeoLoginResponse } from './shared/models/login/ILogin';
import { ISupplier } from './shared/models/searchSuppliers/ISearchSuppliers';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeoService {

  private loginUrl = environment.apiBaseUrl + 'api/v4/Login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.Message}`);

      return of(error as T);
    };
  }

  /** Log a SeoService message with the MessageService */
  private log(message: string) {
    //console.log(`SeoService: ${message}`);
  }

  getSuplierProducts(companyId: number = null): Observable<any> {
    //const _configUrl = '../assets/json/searchproduct.json';
    return this.http.get(environment.mockBaseUrl + "v2/5d6fba903100000d006608ac");
  };

  getfacetSearch(companyId: number) {

    const _configUrl = '../assets/json/facetSearch.json';
    return this.http.get(_configUrl)
      .pipe(map((response: Response) => {
        return <any>response;
      })).pipe(delay(1500));
  }

  loginSeo(seo: ISeoLogin): Observable<any> {
    return this.http.post(this.loginUrl, seo, this.httpOptions).pipe(
      tap((seo: ISeoLogin) => this.log(`Login with username=${seo.Username}`)),
      catchError(this.handleError<any>('loginSeo'))
    );
  }

  getSuppliers(searchText: string, offset: number): Observable<ISupplier[]> {
    //return of(SUPPLIERS);//.pipe(delay(1500));
    return this.http.get(environment.mockBaseUrl + "v2/5d6f8f5531000071006606f6").pipe(
      tap(() => this.log(`Search for Supplier=${searchText}`)),
      catchError(this.handleError<any>('getSuppliers'))).pipe(delay(1000));
  }
}