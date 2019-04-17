import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';

import { ModalAdicionaAgendaComponent } from '../modal-adiciona-agenda/modal-adiciona-agenda.component';
import { Agenda } from 'src/app/models/agenda';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento/evento.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  evento: Evento = new Evento;
  categorias: any [] = []; 
  agendamentos: any[] = [];
  errors: any[] = [];
  dataSource = new MatTableDataSource<Agenda>();

  agendamentosColunas: string[] = ['dataInicial', 'dataFinal', 'acao'];

  cadastroForm = this.fb.group({
    titulo: [null, Validators.required],
    subtitulo: [null, Validators.required],
    vagas: [null, Validators.required],
    idCategoria: [null, Validators.required],
    descricaoCurta: [''],
    descricaoLonga: ['']
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private categoriaService: CategoriaService,
    private eventoService: EventoService,
    private snackBar: MatSnackBar) { 
      this.categoriaService.getAll()
      .subscribe(
        categorias => {
          this.categorias = categorias;
        });
    }

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
    if( this.cadastroForm.dirty && this.cadastroForm.valid ) {
      let evento = Object.assign({}, this.evento, this.cadastroForm.value);
      
      this.eventoService.cadastrar(evento)
      .subscribe( result => {
        this.onSaveComplete(result) 
      }, error => {
        this.onError(error) 
      });
    }
  }

  onSaveComplete(response: any): void {
    debugger;
    this.snackBar.open('Cadastro efetuado com sucesso!', 'Cadastro', {
      duration: 2000,
    });
    this.router.navigate(['/admin-evento']);
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

}