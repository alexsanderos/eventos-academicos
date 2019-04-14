import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento/evento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  eventos: any[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'subtitulo', 'edit'];
  dataSource = new MatTableDataSource<Evento>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventoService: EventoService) {
    this.eventoService.obterTodos()
      .subscribe(
        eventos => {
          this.eventos = eventos;
          this.dataSource.data = eventos;
        });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
