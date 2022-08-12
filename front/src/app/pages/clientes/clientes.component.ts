import { Component, OnInit } from '@angular/core';
declare var Swal: any;
import { PersonaService } from '../../services/persona/persona.service';

// const Swal = require('sweetalert2');


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];
  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  planes!: any;
  cantPlanes = 0;

  totalClientes = 0;
  cargando = true;
  planSeleccionado = 0;  // Parametro seleccionado en el SELECT de planes
  estadoSeleccionado = 'N';  // Parametro seleccionado en el SELECT de los estados de clientes


  constructor(
    public personaService: PersonaService
  ) {
    this.planSeleccionado = 0;
   }

  ngOnInit() {
    this.cargarClientes();

  }

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
onChange(nuevoValor: any) {

  console.log("nuevo valor : ",nuevoValor);
}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambios(nuevoValor: any) {

    this.planSeleccionado = nuevoValor;

    this.cargarClientes();
}

// ==================================================
// Detecta los cambios en el select de los clientes activos/inactivos
// ==================================================
cambiosEstado(nuevoEstado: any) {

  this.estadoSeleccionado = nuevoEstado;


  this.cargarClientes();

}

// ==================================================
// Carga de clientes y filtra por dados de baja/alta/todos
// Ademas filtra por plan
// 0 : Dados de alta
// -1 : Todos
// ==================================================

  cargarClientes() {

    const buscarApellido: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    buscarApellido.value = '';

    const buscarNombre: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    buscarNombre.value = '';

    this.personaService.cargarClientesPlanEstado( this.desde , this.planSeleccionado )
               .subscribe( (resp: any) => {

                this.totalClientes = resp[1][0].cantCli;

                this.clientes = resp[0];

                this.cargando = false;

              });

  }


// ==================================================
//  Busca un cliente por plan o por todos
// ==================================================

  buscarCliente( ) {

    const inputElement: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    const Apellidos: any = inputElement.value || null;

    const inputElement1: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    const Nombres: any = inputElement1.value || null;

    this.personaService.buscarClientePorPlan( Apellidos, Nombres , this.planSeleccionado.toString()  )
            .subscribe( (resp: any) => {

              if( resp.length !== 0 ) {
                this.clientes = resp[0];
                this.totalClientes = resp[1][0].cantCli;
              } else {
                this.totalClientes = 0;
                this.clientes = resp[0];
              }
            });

  }


// ==================================================
//        Borra una persona
// ==================================================

 eliminarCliente( cliente: any ) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + cliente.Nombres + ' ' + cliente.Apellidos,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    })
    .then( (borrar: any) => {

      if (borrar) {

        const parametro = cliente.IdPersona.toString();

        this.personaService.eliminarCliente( parametro )
                  .subscribe( (resp: any) => {
                      this.cargarClientes();
                      if ( resp.mensaje === 'Ok') {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Cliente eliminado',
                          showConfirmButton: false,
                          timer: 2000
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al eliminar',
                          text: 'Contactese con el administrador',
                        });
                      }
                      this.cargarClientes();

                    });

                  }
                });
              }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalClientes ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarClientes();

}


header(text: any) {
	return { text: text, margins: [0, 0, 0, 8] };
}


}
