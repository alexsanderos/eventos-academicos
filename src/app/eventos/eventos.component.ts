import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }
  eventos: any = [];
  ngOnInit() {
    this.eventos = [
      {titulo: 'Meetup sobre .Net C#, .Net Framework',  
        subtitulo: 'Uma reunião para compartilhar conhecimento sobre .Net C#.', 
         descricao: 'Tem interesse em programação, desenvolvimento web, C#, .Net? Venha ao evento!',
          dataInicio: '22/12/2019 15:00', dataFim: '22/12/2019 18:00', categoria: 'Desenvolvimento' },
       {titulo: 'AWS Porto Alegre',  
          subtitulo: 'Conheça como o Triider usa sua arquitetura na AWS.', 
           descricao: 'Vamos realizar o Meetup desse mês com três apresentações de peso, o pessoal da Umov.me irá falar um pouco sobre Lambda + DynamoDB, o pessoal do Triider irá palestra sobre sua arquitetura na AWS, e por fim o Fabio Alves irá palestrar sobre Arquitetura Serverless.',
            dataInicio: '22/12/2019 15:00', dataFim: '22/12/2019 18:00', categoria: 'DevOps' }
    ]
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalConfirmacao);

    dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.router.navigateByUrl('/login');
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

export class Evento {
  titulo: string;
  subtitulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
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
