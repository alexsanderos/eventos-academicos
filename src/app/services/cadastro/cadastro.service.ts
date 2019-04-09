import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from 'src/app/usuario/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroService extends BaseService{

  constructor(private http: HttpClient) { super(); }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
      
    let response = this.http
        .post(this.UrlServiceV1 + "nova-conta", usuario, super.ObterAuthHeaderJson())
        .pipe(map(super.extractData));
        //.catch(super.serviceError);

    return response;
  };

}
