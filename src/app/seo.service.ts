import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SeoLogin, SeoLoginResponse } from './seo';

@Injectable({ providedIn: 'root' })
export class SeoService {

  private seoUrl = 'https://productservice.stage-asicentral.com/api/v4/Login';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SeoService message with the MessageService */
  private log(message: string) {
    console.log(`SeoService: ${message}`);
  }

  getGeoLocationWithExternal() {

    const _configUrl = '../assets/json/searchproduct.json';
    // this._httpClient.get(_configUrl)
    //   .subscribe(data => {
    //     this.appConfig = data;
    //   });
  
    return this.http.get(_configUrl)
      .pipe(map((response: Response) => {
        return <any>response;
      }));
  }

  loginSeo (seo: SeoLogin): Observable<SeoLoginResponse> {
    return this.http.post(this.seoUrl, seo, this.httpOptions).pipe(
      tap((seo: SeoLogin) => this.log(`Login with username=${seo.Username}`)),
      catchError(this.handleError<any>('loginSeo'))
    );
  }  
}