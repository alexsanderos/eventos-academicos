import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatMenuModule, MatButtonModule } from '@angular/material';

import { MenuComponent } from './menu-login/menu.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavegacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    MenuComponent,
    NavegacaoComponent
  ]
})
export class MenuModule { }
