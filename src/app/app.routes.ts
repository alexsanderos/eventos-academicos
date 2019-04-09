import { Routes } from '@angular/router';

import { LoginComponent } from './usuario/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { DashboardComponent } from './perfil-aluno/dashboard/dashboard.component';

export const rootRouterConfig: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/cadastro-usuario', component: CadastroComponent },
    { path: 'site', loadChildren: './perfil-aluno/perfil.aluno.module#PerfilAlunoModule' },
];