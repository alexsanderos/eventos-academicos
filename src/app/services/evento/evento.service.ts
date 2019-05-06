import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { Evento } from 'src/app/models/evento';
import { Agenda } from 'src/app/models/agenda';
import { Usuario } from 'src/app/usuario/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends BaseService{

  constructor(private http: HttpClient) { super(); }

  obterTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.UrlServiceV1 + "eventos", super.ObterAuthHeaderJson());
  }

  obterMeusEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.UrlServiceV1 + "eventos/meus-eventos", super.ObterAuthHeaderJson());
  }

  obterEvento(id): Observable<Evento> {
    return this.http.get<Evento>(this.UrlServiceV1 + "eventos/" + id, super.ObterAuthHeaderJson() );
  }

  obterAgendamentos(id): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.UrlServiceV1 + "eventos/" + id + "/agendamentos", super.ObterAuthHeaderJson() );
  }

  obterInscritos(id): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.UrlServiceV1 + "eventos/" + id + "/inscritos",
          super.ObterAuthHeaderJson());
  }

  cadastrar(evento: Evento): Observable<Evento> {
    let response = this.http.post(this.UrlServiceV1 + "eventos", evento, super.ObterAuthHeaderJson())
      .pipe(map(super.extractData, catchError(super.serviceError)));
      
    return response;
  }

  editar(evento: Evento): Observable<Evento> {
    let response = this.http.put(this.UrlServiceV1 + "eventos", evento, super.ObterAuthHeaderJson())
      .pipe(map(super.extractData, catchError(super.serviceError)));
      
    return response;
  }

  removerEvento(id): Observable<any> {
    return this.http.delete<any>(this.UrlServiceV1 + "eventos/" + id, super.ObterAuthHeaderJson() );
  }

  queroIrEvento(id): Observable<any> {
    return this.http.post(this.UrlServiceV1 + "eventos/" + id + "/queroir", null , super.ObterAuthHeaderJson());
  }

  desistirEvento(id): Observable<any> {
    return this.http.post(this.UrlServiceV1 + "eventos/" + id + "/desistir", null , super.ObterAuthHeaderJson());
  }
}
