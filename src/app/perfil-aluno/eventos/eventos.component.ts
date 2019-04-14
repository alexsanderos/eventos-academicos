import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA } from '@angular/material';
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
    private eventoService: EventoService) { }
  eventos: any = [];
  ngOnInit() {

    this.eventoService.obterTodos()
      .subscribe(
        eventos => this.eventos = eventos
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalConfirmacao);

    dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.router.navigateByUrl('/auth/login');
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
