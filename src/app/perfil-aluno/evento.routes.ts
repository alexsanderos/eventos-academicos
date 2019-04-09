import { Routes } from '@angular/router';

import { EventosComponent } from "./eventos/eventos.component";

import { AuthService } from "../services/auth/auth.service";

export const eventosRouterConfig: Routes = [
    {
        path: 'eventos', component: EventosComponent,
        children: [
            { path: '', component: EventosComponent },
            //{ path: 'novo', canActivate: [AuthService], component: AdicionarEventoComponent, data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }] },
        ]
    }
];