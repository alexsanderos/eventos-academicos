import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/app/usuario/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(private http: HttpClient) { super(); }

  login(login: LoginModel): Observable<LoginModel> {
      
    let response = this.http
        .post(this.UrlServiceV1 + "conta", login, super.ObterAuthHeaderJson())
        .pipe(map(super.extractData));
        
    return response;
};

}
