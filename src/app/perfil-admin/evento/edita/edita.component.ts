import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';

import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Evento } from 'src/app/models/evento';
import { Agenda } from 'src/app/models/agenda';
import { EventoService } from 'src/app/services/evento/evento.service';
import { ModalAdicionaAgendaComponent } from '../modal-adiciona-agenda/modal-adiciona-agenda.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edita',
  templateUrl: './edita.component.html',
  styleUrls: ['./edita.component.css']
})
export class EditaComponent implements OnInit {

  spinner: boolean = false;
  evento: Evento = new Evento;
  categorias: any [] = []; 
  agendamentos: any[] = [];
  errors: any[] = [];
  sub: Subscription;
  eventoId: string = "";

  dataSource = new MatTableDataSource<Agenda>();

  agendamentosColunas: string[] = ['dataInicio', 'dataFim', 'acao'];

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { 
      this.categoriaService.getAll()
      .subscribe(
        categorias => {
          this.categorias = categorias;
        });
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
        this.obterEvento(this.eventoId);
      }
    );
  }

  obterEvento(id: string) {
    this.spinner = true;
    this.eventoService.obterEvento(id)
      .subscribe(
        evento => this.preencherFormEvento(evento),
      );
    this.eventoService.obterAgendamentos(id)
      .subscribe(
        agendamento => this.preencheAgendamento(agendamento),
      );
  }

  preencheAgendamento(agendamentos: Agenda[]) {
    this.spinner = false;
    this.agendamentos = agendamentos;
    this.dataSource.data = this.agendamentos;
    this.changeDetectorRefs.detectChanges();
  }

  preencherFormEvento(evento: Evento): void {
    this.spinner = false;
    this.cadastroForm.patchValue({
      titulo: evento.titulo,
      subtitulo: evento.subtitulo,
      idCategoria: evento.idCategoria,
      descricaoCurta: evento.descricaoCurta,
      descricaoLonga: evento.descricaoLonga,
      vagas: evento.vagas
    });
  }

  adicionarAgendamento() {
    const dialogRef = this.dialog.open(ModalAdicionaAgendaComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result.eventoId = this.eventoId;
        this.agendamentos.push(result);
        this.dataSource.data = this.agendamentos;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  removerAgendamento(item){
    let index = this.agendamentos.indexOf(item, 0);
    if (index > -1) {
      this.agendamentos.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource<Agenda>(this.agendamentos);
  }

  onSubmit(){
    if( this.cadastroForm.dirty && this.cadastroForm.valid ) {
      this.spinner = true;
      let evento = Object.assign({}, this.evento, this.cadastroForm.value);
      
      evento.agendamentos = this.agendamentos;
      evento.id = this.eventoId;

      this.eventoService.editar(evento)
      .subscribe( result => {
        this.onSaveComplete(result) 
      }, error => {
        this.onError(error) 
      });
    }
  }

  onSaveComplete(response: any): void {
    this.spinner = false;
    this.snackBar.open('Cadastro efetuado com sucesso!', 'Cadastro', {
      duration: 2000,
    });
    this.router.navigate(['/admin-evento']);
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
}
