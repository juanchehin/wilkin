import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

// Clientes
import { ClienteComponent } from './clientes/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarclienteComponent } from './clientes/editarcliente.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './principal/dashboard.component';

const pagesRoutes: Routes = [

    // Patch donde pueden acceder los profesionales y administradores
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'principal', component: DashboardComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: 'cliente', component: ClienteComponent },
            { path: 'cliente/editar/:id', component: EditarclienteComponent },
            { path: 'login', component: LoginComponent },

            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
