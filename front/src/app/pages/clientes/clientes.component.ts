import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../services/general/general.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];
  desde = 0;
  totalClientes = 0;

  constructor(
    public GeneralService: GeneralService
  ) {
   }

  ngOnInit() {
    this.cargarClientes();

  }

// ==================================================
// Carga de clientes
// ==================================================

  cargarClientes() {

    const buscarApellido: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    buscarApellido.value = '';

    const buscarNombre: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    buscarNombre.value = '';

    this.GeneralService.cargarClientes( this.desde )
               .subscribe( (resp: any) => {

                this.totalClientes = resp[1][0].cantCli;

                this.clientes = resp[0];

                // this.cargando = false;

              });

  }


// ==================================================
//  Busca el cliente por patente
// ==================================================

buscarPatente( ) {

  const inputElement: HTMLInputElement = document.getElementById('buscarPatente') as HTMLInputElement;
  const Patente: any = inputElement.value || null;


  this.GeneralService.buscarPatente( Patente  )
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
//  Busca un cliente por plan o por todos
// ==================================================

buscarCliente( ) {

  const inputElement: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
  const Apellidos: any = inputElement.value || null;

  const inputElement1: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
  const Nombres: any = inputElement1.value || null;

  this.GeneralService.buscarCliente( Apellidos, Nombres  )
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

      if (borrar.isConfirmed) {

        const parametro = cliente.IdCliente.toString();

        this.GeneralService.eliminarCliente( parametro )
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



}
