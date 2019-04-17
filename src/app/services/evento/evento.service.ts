import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { Evento } from 'src/app/models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends BaseService{

  constructor(private http: HttpClient) { super(); }

  obterTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.UrlServiceV1 + "eventos", super.ObterAuthHeaderJson() );
  }

  cadastrar(evento: Evento): Observable<Evento> {
    let response = this.http.post(this.UrlServiceV1 + "eventos", evento, super.ObterAuthHeaderJson())
      .pipe(map(super.extractData, catchError(super.serviceError)));
      
    return response;
  }
}
