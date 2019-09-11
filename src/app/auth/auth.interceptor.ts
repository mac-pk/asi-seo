import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //if (req.headers.get('No-Auth') == "True")
        //return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("authtoken", localStorage.getItem('userToken'))
            });
            const started = Date.now();
            return next.handle(clonedreq).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        const elapsed = Date.now() - started;
                        //console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                    }
                }, error => {
                    if (error.status === 401)
                        this.router.navigateByUrl('/login');
                })
            )
        }
        else {
            return next.handle(req.clone());
            //this.router.navigateByUrl('/login');
        }
    }
}