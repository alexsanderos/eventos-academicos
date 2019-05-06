
import { Routes } from '@angular/router';

import { EventosComponent } from "./eventos/eventos.component";

import { AuthService } from "../services/auth/auth.service";

export const alunoRouterConfig: Routes = [
    {
        path: 'eventos', component: EventosComponent,
        children: [
            { path: '', component: EventosComponent }
        ]
    }
];