import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Categoria } from 'src/app/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService{

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.UrlServiceV1 + "categorias", super.ObterAuthHeaderJson() );
  }

}
