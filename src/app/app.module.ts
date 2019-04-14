import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule, MatRadioModule, MatDialog, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { LoginComponent } from './usuario/login/login.component';
import { DashboardComponent } from './perfil-aluno/dashboard/dashboard.component';
import { PerfilAlunoModule } from './perfil-aluno/perfil.aluno.module';
import { MenuModule } from './menu/menu.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PerfilAdminModule } from './perfil-admin/perfil-admin.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(rootRouterConfig),
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    MatCheckboxModule,
    PerfilAlunoModule,
    PerfilAdminModule,
    MenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    MatDatepickerModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
