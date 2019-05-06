import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatDialogModule, MatDatepickerModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxMaskModule } from 'ngx-mask';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ListaComponent, ModalConfirmacao } from './lista/lista.component';
import { MenuModule } from 'src/app/menu/menu.module';
import { EditaComponent } from './edita/edita.component';
import { RouterModule } from '@angular/router';
import { NovoComponent } from './novo/novo.component';
import { ModalAdicionaAgendaComponent } from './modal-adiciona-agenda/modal-adiciona-agenda.component';
import { ListaInscritosComponent } from './lista-inscritos/lista-inscritos.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorInterceptor } from 'src/app/services/error.handler.service';

@NgModule({
  declarations: [
    ListaComponent, 
    EditaComponent, 
    NovoComponent, 
    ModalAdicionaAgendaComponent, 
    ModalConfirmacao, 
    ListaInscritosComponent
  ],
  entryComponents: [
    ModalAdicionaAgendaComponent,
    ModalConfirmacao
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    MenuModule
  ],
  providers: [
    AuthService,        
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
     }
  ]
})
export class EventoModule { }
