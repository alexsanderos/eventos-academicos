import { Routes } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";

import { ListaComponent } from "./evento/lista/lista.component";
import { EditaComponent } from './evento/edita/edita.component';
import { NovoComponent } from './evento/novo/novo.component';

export const adminRouterConfig: Routes = [
    {
        path: 'admin-evento',
        children: [
            { path: '', component: ListaComponent },
            { path: 'editar', component: EditaComponent },
            { path: 'novo', component: NovoComponent }
            //{ path: 'novo', canActivate: [AuthService], component: AdicionarEventoComponent, data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }] },
        ]
    }
];