import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ListaComponent } from './lista/lista.component';
import { MenuModule } from 'src/app/menu/menu.module';
import { EditaComponent } from './edita/edita.component';
import { RouterModule } from '@angular/router';
import { NovoComponent } from './novo/novo.component';

@NgModule({
  declarations: [ListaComponent, EditaComponent, NovoComponent],
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
    MenuModule
  ]
})
export class EventoModule { }
