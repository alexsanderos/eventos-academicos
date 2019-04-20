import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento/evento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  eventos: any[] = [];
  spinner: boolean = false;
  errors: any[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'subtitulo', 'edit'];
  dataSource = new MatTableDataSource<Evento>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventoService: EventoService, 
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  removerItem(id) {
    const dialogRef = this.dialog.open(ModalConfirmacao);

    dialogRef.afterClosed().subscribe(result => {
        if(result)
        {
        this.eventoService.removerEvento(id)
          .subscribe( result => {
            this.onDeleteComplete(result) 
          }, error => {
            this.onError(error) 
          });
        }
    });
  }

  onDeleteComplete(response: any): void {
    this.spinner = false;
    this.snackBar.open('Registro removido com sucesso!', 'Remover', {
      duration: 2000,
    });
    
    for (let index = 0; index < this.dataSource.data.length; index++) {
        if(this.dataSource.data[index].id === response.data.id){
            this.eventos.splice(index, 1);      
        }
    }

    this.dataSource = new MatTableDataSource<Evento>(this.eventos);
    this.dataSource.paginator = this.paginator;
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

  ngOnInit() {
    this.spinner = true;
    this.eventoService.obterTodos()
      .subscribe(
        eventos => { this.onLoadComplete(eventos)});
  }

  onLoadComplete(eventos: Evento[]){
    this.spinner = false;
    this.eventos = eventos;
    this.dataSource.data = eventos;
    this.dataSource.paginator = this.paginator;
  }
}

@Component({
  selector: 'modal-confirmacao',
  templateUrl: './modal.confirmacao.html',
})
export class ModalConfirmacao {}