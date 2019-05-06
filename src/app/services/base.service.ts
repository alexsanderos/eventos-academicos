import { HttpClient, HttpHeaders } from "@angular/common/http";

export abstract class BaseService {
  protected UrlServiceV1: string = "https://appevent.azurewebsites.net/api/v1/";

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

    protected ObterAuthHeaderExcel(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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
        let errorShow: string;
        debugger;
        if (error instanceof Response) {
            if(error.status == 400) {
                errorShow =`${error.status} - ${error.statusText || ''}`; 
            }
            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return errorShow;
    }
}