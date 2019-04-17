import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(catchError(err => {
            
            if(err instanceof HttpErrorResponse) {
                if(err.status === 401){
                    localStorage.removeItem('event.token');
                    localStorage.removeItem('event.user');
                    this.router.navigate(['/entrar']);
                }
                if (err.status === 403) {
                    this.router.navigate(['/acesso-negado']);
                }
                if (err.status === 404) {
                    this.router.navigate(['/nao-encontrado']);
                }
            }

            return throwError(err);
        }));
    }    
}