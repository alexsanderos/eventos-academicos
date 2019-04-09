import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogin : LoginModel;
  errors: any[] = [];

  loginForm = this.fb.group({
    email: [null, Validators.required],
    senha: [null, Validators.required],
    lembrar: [null]
  });


  constructor(private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar ) { 
    this.usuarioLogin = new LoginModel();
  }

  ngOnInit() {
    
  }


  onSubmit() {
    if( this.loginForm.dirty && this.loginForm.valid ) {
      this.usuarioLogin.email = this.loginForm.get('email').value;
      this.usuarioLogin.password = this.loginForm.get('senha').value;
      this.usuarioLogin.rememberMe = (this.loginForm.get('lembrar').value) ? true : false;

      this.loginService.login(this.usuarioLogin)
      .subscribe( result => { this.onSaveComplete(result) },
      error => { this.onError(error) });
    }
}

onSaveComplete(response: any): void {
  localStorage.setItem('event.token', response.access_token);
  localStorage.setItem('event.user', JSON.stringify(response.user));

  this.snackBar.open('Login efetuado com sucesso!', 'Cadastro', {
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
