import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmacao, ModalDetalhes, EventosComponent } from './eventos/eventos.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { ErrorInterceptor } from '../services/error.handler.service';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule } from '@angular/material';

import { alunoRouterConfig } from './aluno.routes';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [
    EventosComponent,
    ModalConfirmacao,
    ModalDetalhes,
  ],
  entryComponents: [
    ModalConfirmacao,
    ModalDetalhes
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(alunoRouterConfig),
    MenuModule
  ],
  providers: [
    AuthService,        
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }
],
exports: [RouterModule],
  
})
export class PerfilAlunoModule { }
