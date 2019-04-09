import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/perfil-aluno/eventos/eventos.component';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends BaseService{

  constructor(private http: HttpClient) { super(); }

  obterTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.UrlServiceV1 + "eventos", super.ObterAuthHeaderJson() );
  }
}
