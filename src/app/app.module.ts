import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule, MatRadioModule, MatDialog, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NevegacaoComponent } from './nevegacao/nevegacao.component';
import { EventosComponent, ModalConfirmacao, ModalDetalhes } from './eventos/eventos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
      { path: 'lista-eventos', component: EventosComponent },
      { path: 'cadastro-usuario', component: CadastroComponent },
      { path: 'login', component: LoginComponent }
    ];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NevegacaoComponent,
    CadastroComponent,
    LoginComponent,
    EventosComponent,
    ModalConfirmacao,
    ModalDetalhes
  ],
  entryComponents: [
    ModalConfirmacao,
    ModalDetalhes
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
