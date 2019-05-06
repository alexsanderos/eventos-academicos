import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { EventoService } from 'src/app/services/evento/evento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: any = [];
  errors: any [] = [];
  meusEventos: any = '';
  spinner: boolean = false;
  sub: Subscription;
  usuario: any = JSON.parse(localStorage.getItem('event.user'));


  constructor(public dialog: MatDialog, 
    private router: Router,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { 
    }
    
    ngOnInit() {
      this.sub = this.route.queryParams.subscribe(
        params => {
          this.meusEventos = params['meusEventos'];
          if(this.meusEventos){
            this.carregaMeusEventos();
          } else{
            this.carregaEventos();
          }
        }
      );
  }

  openQueroIr(evento) {
    const dialogRef = this.dialog.open(ModalConfirmacao, {
      data: {
        texto: "Gostaria de se inscrever no evento?"
      }});

    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.queroIr(evento.id);
        }
    });
  }

  openDesistir(evento) {
    const dialogRef = this.dialog.open(ModalConfirmacao, {
      data: {
        texto: "Gostaria de desistir do evento?"
      }});

    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.desistir(evento.id);
        }
    });
  }

  abrirDetalhes(evento) {
    const dialogRef = this.dialog.open(ModalDetalhes, {
      width: '700px',
      data: {
        evento: evento
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        
    });
  }

  carregaEventos(){
    this.spinner = true;
    this.eventoService.obterTodos()
    .subscribe(
      eventos => {
        this.spinner = false;
        this.eventos = eventos;
      });
  }

  carregaMeusEventos(){
    this.spinner = true;
    this.eventoService.obterMeusEventos()
    .subscribe(
      eventos => {
        this.spinner = false;
        this.eventos = eventos;
      });
  }

  usuarioJaInteressado(evento) {
    let interessado = false;
    if(this.usuario == null || this.usuario == undefined || this.usuario == "") {
      return interessado;
    }

    for (let index = 0; index < evento.usuarioEventos.length; index++) {
      const uev = evento.usuarioEventos[index];

      if(uev.idUsuario === this.usuario.id){
        interessado = true;
      }
    }
    return interessado;
  }

  queroIr(id) {
    if(this.usuario == null || this.usuario == undefined || this.usuario == "") {
      this.router.navigate(['/auth/login']);
    } else{
      this.eventoService.queroIrEvento(id)
        .subscribe( result => {
          this.onSaveComplete(result) 
        }, error => {
          this.onError(error) 
        });
    }
  }

  desistir(id) {
    this.eventoService.desistirEvento(id)
      .subscribe( result => {
        this.onSaveComplete(result) 
      }, error => {
        this.onError(error) 
      });
  }

  onSaveComplete(response: any): void {
    if(this.meusEventos){
      this.carregaMeusEventos();
    } else{
      this.carregaEventos();
    }

    this.snackBar.open('Registro de efetuado com sucesso!', 'Quero ir!', {
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
export class ModalConfirmacao {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'modal-detalhes',
  templateUrl: './modal.detalhes.html',
})
export class ModalDetalhes {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
