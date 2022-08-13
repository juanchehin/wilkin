import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

// Clientes
import { ClienteComponent } from './clientes/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarclienteComponent } from './clientes/editarcliente.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './principal/dashboard.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { HistoricoComponent } from './historico/historico.component';
import { DetalleHistoricoComponent } from './historico/detalle-historico.component';

const pagesRoutes: Routes = [

  {
    path: '',
    component: PagesComponent,
    children: [
        { path: 'login', component: LoginComponent },

        { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        children: [
            { path: 'principal', component: DashboardComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: 'cliente', component: ClienteComponent },
            { path: 'cliente/editar/:id', component: EditarclienteComponent },
            { path: 'cliente/historico/:id', component: HistoricoComponent },
            { path: 'cliente/historico/detalle/:id', component: DetalleHistoricoComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
