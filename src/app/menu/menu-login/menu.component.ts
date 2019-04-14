import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public token;
  public user;
  public nome: string = "";
  
  constructor(private router: Router) {
    this.token = localStorage.getItem('event.token');
    var usuario = localStorage.getItem('event.user');
    if(usuario != undefined && usuario != 'undefined' && usuario != null ) {
      this.user = JSON.parse(localStorage.getItem('event.user'));
    }
   }

  ngOnInit() {
    if(this.user)
        this.nome = this.user.nome;
  }

  usuarioLogado(): boolean {
    return this.token !== null && this.token !== 'undefined';
  }

  logout() {
    localStorage.removeItem('event.token');
    localStorage.removeItem('event.user');
    this.router.navigateByUrl('/auth/login');
  }

}
