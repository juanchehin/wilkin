import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Clientes
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { EditarclienteComponent } from './clientes/editarcliente.component';



@NgModule({
    declarations: [
        PagesComponent,
        ClientesComponent,
        ClienteComponent,
        EditarclienteComponent,
      ],
    exports: [
        PagesComponent
    ],
    imports: [
        PAGES_ROUTES,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})

export class PagesModule { }
