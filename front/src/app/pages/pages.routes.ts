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
import { TrabajoComponent } from './trabajos/trabajo.component';
// Filtros
import { FiltrosComponent } from './filtros/filtros.component';
import { FiltroComponent } from './filtros/filtro.component';
import { EditarfiltroComponent } from './filtros/editarfiltro.component';
// Aceites
import { AceitesComponent } from './aceites/aceites.component';
import { AceiteComponent } from './aceites/aceite.component';
import { EditaraceiteComponent } from './aceites/editaraceite.component';

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
            { path: 'cliente/historico/detalle/:IdCliente/:IdTrabajo', component: DetalleHistoricoComponent },
            { path: 'cliente/trabajo/:id', component: TrabajoComponent },
            // Filtros
            { path: 'filtros', component: FiltrosComponent },
            { path: 'filtro', component: FiltroComponent },
            { path: 'filtro/editar/:id', component: EditarfiltroComponent },
            // Aceites
            { path: 'aceites', component: AceitesComponent },
            { path: 'aceite', component: AceiteComponent },
            { path: 'aceite/editar/:id', component: EditaraceiteComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
