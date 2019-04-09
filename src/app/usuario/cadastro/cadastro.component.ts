import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter, MatSnackBar } from '@angular/material';

import { Usuario } from '../models/usuario';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuario: Usuario;
  errors: any[] = [];

  cadastroForm = this.fb.group({
    nome: [null, Validators.required],
    cpf: [null, Validators.required],
    email: [null, Validators.required],
    dataNascimento: [null, Validators.required],
    senha: [null, Validators.required],
    confirmacaoSenha: [null, Validators.required],
    empresaInstituicao: ['']
  });

  constructor(private fb: FormBuilder, 
    private cadastroService: CadastroService,
    private adapter: DateAdapter<any>,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.usuario = new Usuario();
    this.adapter.setLocale('pt-BR');
  }

  onSubmit() {
      if( this.cadastroForm.dirty && this.cadastroForm.valid ) {
        this.usuario.nome = this.cadastroForm.get('nome').value;
        this.usuario.dataNascimento = this.cadastroForm.get('dataNascimento').value;
        this.usuario.cpf = this.cadastroForm.get('cpf').value;
        this.usuario.email = this.cadastroForm.get('email').value;
        this.usuario.empresaInstituicao = this.cadastroForm.get('empresaInstituicao').value;
        this.usuario.password = this.cadastroForm.get('senha').value;
        this.usuario.confirmPassword = this.cadastroForm.get('confirmacaoSenha').value;
        
        this.cadastroService.registrarUsuario(this.usuario)
        .subscribe( result => { this.onSaveComplete(result) },
        error => { this.onError(error) });
      }
  }

  onSaveComplete(response: any): void {
    debugger;
    localStorage.setItem('event.token', response.access_token);
    localStorage.setItem('event.user', JSON.stringify(response.user));

    this.snackBar.open('Cadastro efetuado com sucesso!', 'Cadastro', {
      duration: 2000,
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  onError(fail) {
    this.snackBar.open('Ocorreu um erro no processamento!', 'Erro', {
      duration: 2000,
    });
    this.errors = fail.errors;
  }

}
