import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


// Clientes
import { ClienteComponent } from './clientes/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarclienteComponent } from './clientes/editarcliente.component';


const pagesRoutes: Routes = [
    // Patch donde pueden acceder los clientes,profesionales y administradores
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'cliente/medicion/editar/:IdMedicion/:IdPersona', component: EditarmedicionComponent },
            { path: 'cliente/asistencias/historico/:IdPersona', component: HistoricoComponent },
            { path: '', redirectTo: 'principal', pathMatch: 'full' }
        ]
    },
    // Patch donde pueden acceder los profesionales y administradores
    {
        path: '',
        component: PagesComponent,
        children: [
            // Clientes
            { path: 'mantenimiento/clientes', component: ClientesComponent },
            { path: 'mantenimiento/cliente', component: ClienteComponent },
            { path: 'mantenimiento/cliente/editar/:id', component: EditarclienteComponent },
            { path: '', redirectTo: 'principal', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
