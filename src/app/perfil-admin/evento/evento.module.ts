import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatDialogModule, MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxMaskModule } from 'ngx-mask';

import { ListaComponent } from './lista/lista.component';
import { MenuModule } from 'src/app/menu/menu.module';
import { EditaComponent } from './edita/edita.component';
import { RouterModule } from '@angular/router';
import { NovoComponent } from './novo/novo.component';
import { ModalAdicionaAgendaComponent } from './modal-adiciona-agenda/modal-adiciona-agenda.component';

@NgModule({
  declarations: [ListaComponent, EditaComponent, NovoComponent, ModalAdicionaAgendaComponent],
  entryComponents: [
    ModalAdicionaAgendaComponent
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
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    MenuModule
  ]
})
export class EventoModule { }
