import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/usuario/models/usuario';
import { EventoService } from 'src/app/services/evento/evento.service';
import { Evento } from 'src/app/models/evento';

@Component({
  selector: 'app-lista-inscritos',
  templateUrl: './lista-inscritos.component.html',
  styleUrls: ['./lista-inscritos.component.css']
})
export class ListaInscritosComponent implements OnInit {

  inscritos: any[] = [];
  spinner: boolean = false;
  errors: any[] = [];
  sub: Subscription;
  eventoId: string = "";
  evento: Evento;
  
  displayedColumns: string[] = ['id', 'nome', 'cpf'];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventoService: EventoService, 
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner = true;

    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
        this.eventoService.obterInscritos(this.eventoId)
          .subscribe(inscritos => { this.onLoadComplete(inscritos)});

        this.eventoService.obterEvento(this.eventoId)
          .subscribe(evento => { this.evento = evento});
      }
    );
  }

  onError(fail) {
    this.spinner = false;
    if(fail.error.success === false) {
      this.errors = fail.error.errors;
    }

    for (let index = 0; index < this.errors.length; index++) {
      const msg = this.errors[index];
      this.snackBar.open(msg, 'Erro', {
        duration: 5000,
      });
    }
  }

  onLoadComplete(usuarios: Usuario[]){
    this.spinner = false;
    this.inscritos = usuarios;
    this.dataSource.data = usuarios;
    this.dataSource.paginator = this.paginator;
  }

}
