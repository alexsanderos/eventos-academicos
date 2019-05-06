import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { adminRouterConfig } from './admin.routes';
import { EventoModule } from './evento/evento.module';
import { AuthService } from '../services/auth/auth.service';
import { ErrorInterceptor } from '../services/error.handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventoModule,
    RouterModule.forChild(adminRouterConfig),
  ],
  providers: [
    AuthService,        
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
     }
  ],
  exports: [RouterModule]
})
export class PerfilAdminModule { }
