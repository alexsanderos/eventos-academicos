import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { ModalAdicionaAgendaComponent } from '../modal-adiciona-agenda/modal-adiciona-agenda.component';
import { Agenda } from 'src/app/models/agenda';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  categorias: any [] = []; 
  agendamentos: any[] = [];
  dataSource = new MatTableDataSource<Agenda>();

  agendamentosColunas: string[] = ['dataInicial', 'dataFinal', 'acao'];

  cadastroForm = this.fb.group({
    titulo: [null, Validators.required],
    subtitulo: [null, Validators.required],
    vagas: [null, Validators.required],
    categoria: [null, Validators.required],
    descricaoCurta: [''],
    descricaoLonga: ['']
  });

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    
  }

  adicionarAgendamento() {
    const dialogRef = this.dialog.open(ModalAdicionaAgendaComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.agendamentos.push(result);
        this.dataSource.data = this.agendamentos;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  removerAgendamento(item){
    
  }

  onSubmit(){
    console.log("submit");
  }

}