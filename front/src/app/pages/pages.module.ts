import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Clientes
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { EditarclienteComponent } from './clientes/editarcliente.component';
import { DashboardComponent } from './principal/dashboard.component';
import { HistoricoComponent } from './historico/historico.component';
import { DetalleHistoricoComponent } from './historico/detalle-historico.component';



@NgModule({
    declarations: [
        PagesComponent,
        ClientesComponent,
        ClienteComponent,
        EditarclienteComponent,
        DashboardComponent,
        HistoricoComponent,
        DetalleHistoricoComponent
      ],
    exports: [
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})

export class PagesModule { }
