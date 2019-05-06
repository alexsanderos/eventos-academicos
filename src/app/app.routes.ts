import { Routes } from '@angular/router';

import { LoginComponent } from './usuario/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { AcessoNegadoComponent } from './error/acesso-negado/acesso-negado.component';
import { EventosComponent } from './perfil-aluno/eventos/eventos.component';

export const rootRouterConfig: Routes = [
    { path: '', component: EventosComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'acesso-negado', component: AcessoNegadoComponent },
    { path: 'auth/cadastro-usuario', component: CadastroComponent },
    { path: 'site', loadChildren: './perfil-aluno/perfil.aluno.module#PerfilAlunoModule' },
];