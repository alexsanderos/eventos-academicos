import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Usuario } from "../usuario/models/usuario";
import { Observable } from 'rxjs';

export abstract class BaseService {
  protected UrlServiceV1: string = "http://localhost:58849/api/v1/";

    protected ObterHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('event.user'));
    }

    protected obterTokenUsuario(): string {
        return localStorage.getItem('event.token');
    }

    protected extractData(response: any){
        return response.data || {};
    }

    protected serviceError(error: Response | any){
        let errMsg: string;

        if (error instanceof Response) {

            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(error);
        return Observable.throw(error);
    }
}