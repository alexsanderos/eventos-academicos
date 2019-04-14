import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { adminRouterConfig } from './admin.routes';
import { EventoModule } from './evento/evento.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventoModule,
    RouterModule.forChild(adminRouterConfig),
  ]
})
export class PerfilAdminModule { }
