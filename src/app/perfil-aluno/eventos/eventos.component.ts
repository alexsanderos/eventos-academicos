import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { EventoService } from 'src/app/services/evento/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(public dialog: MatDialog, 
    private router: Router,
    private eventoService: EventoService,
    private snackBar: MatSnackBar) { }
  eventos: any = [];
  errors: any [] = [];

  ngOnInit() {

    this.eventoService.obterTodos()
      .subscribe(
        eventos => {
          this.eventos = eventos;
        });
  }

  openDialog(evento) {
    const dialogRef = this.dialog.open(ModalConfirmacao);

    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.queroIr(evento.id);
        }
    });
  }

  abrirDetalhes(evento) {
    const dialogRef = this.dialog.open(ModalDetalhes, {
      data: {
        evento: evento
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        
    });
  }

  queroIr(id) {
    this.eventoService.queroIrEvento(id)
      .subscribe( result => {
        this.onSaveComplete(result) 
      }, error => {
        this.onError(error) 
      });
  }

  onSaveComplete(response: any): void {
    this.snackBar.open('Registro de interesse efetuado com sucesso!', 'Quero ir!', {
      duration: 2000,
    });
  }

  onError(fail) {
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

  obterDataInicioMenor(agendamentos){
    let dataMenor: Date;

    for (let index = 0; index < agendamentos.length; index++) {
      if(index === 0){
        dataMenor = agendamentos[index].dataInicio;
      } 
      else if(dataMenor > agendamentos[index].dataInicio){
        dataMenor = agendamentos[index].dataInicio;
      }
    }
    return dataMenor;
  }

  obterDataFimMaior(agendamentos){
    let dataMaior: Date;

    for (let index = 0; index < agendamentos.length; index++) {
      if(index === 0){
        dataMaior = agendamentos[index].dataFim;
      } 
      else if(dataMaior < agendamentos[index].dataFim){
        dataMaior = agendamentos[index].dataFim;
      }
    }
    return dataMaior;
  }

}

@Component({
  selector: 'modal-confirmacao',
  templateUrl: './modal.confirmacao.html',
})
export class ModalConfirmacao {}

@Component({
  selector: 'modal-detalhes',
  templateUrl: './modal.detalhes.html',
})
export class ModalDetalhes {
  constructor(@Inject(MAT_DIALOG_DATA) public data: []) {}

}
