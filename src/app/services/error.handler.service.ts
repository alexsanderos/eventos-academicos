import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe( map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if(event.status === 401){
                        localStorage.removeItem('event.token');
                        localStorage.removeItem('event.user');
                        this.router.navigate(['/auth/login']);
                    }
                    if (event.status === 403) {
                        this.router.navigate(['/acesso-negado']);
                    }
                    if (event.status === 404) {
                        this.router.navigate(['/nao-encontrado']);
                    }
                }

                return event;
            }));
    }    
}