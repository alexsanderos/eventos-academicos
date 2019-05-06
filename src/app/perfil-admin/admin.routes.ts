import { Routes } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";

import { ListaComponent } from "./evento/lista/lista.component";
import { EditaComponent } from './evento/edita/edita.component';
import { NovoComponent } from './evento/novo/novo.component';
import { ListaInscritosComponent } from './evento/lista-inscritos/lista-inscritos.component';

export const adminRouterConfig: Routes = [
    {
        path: 'admin-evento',
        children: [
            { path: '', canActivate: [AuthService], component: ListaComponent, data: [{ claim: { nome: 'Evento', valor: 'Gravar' } }] },
            { path: 'editar/:id', canActivate: [AuthService], component: EditaComponent, data: [{ claim: { nome: 'Evento', valor: 'Gravar' } }] },
            { path: 'lista-inscritos/:id', canActivate: [AuthService], component: ListaInscritosComponent, data: [{ claim: { nome: 'Evento', valor: 'Gravar' } }] },
            { path: 'novo', canActivate: [AuthService], component: NovoComponent, data: [{ claim: { nome: 'Evento', valor: 'Gravar' } }] }
        ]
    }
];