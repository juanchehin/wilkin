import { Component, OnInit } from '@angular/core';
declare var Swal: any;
import { GeneralService } from '../../services/general/general.service';

// const Swal = require('sweetalert2');

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styles: []
})
export class FiltrosComponent implements OnInit {

  filtros: any[] = [];
  desde = 0;
  totalFiltros = 0;

  constructor(
    public generalService: GeneralService
  ) {
   }

  ngOnInit() {
    this.cargarFiltrosPaginado();

  }

// ==================================================
// Carga de filtros
// ==================================================

  cargarFiltrosPaginado() {

    const buscarFiltros: HTMLInputElement = document.getElementById('buscarFiltros') as HTMLInputElement;
    buscarFiltros.value = '';

    this.generalService.cargarFiltrosPaginado( this.desde )
               .subscribe( (resp: any) => {

                this.totalFiltros = resp[1][0].cantFiltros;

                this.filtros = resp[0];

                // this.cargando = false;

              });

  }


// ==================================================
//  Busca el filtro por nombre
// ==================================================

buscarFiltro( ) {

  const inputElement: HTMLInputElement = document.getElementById('buscarFiltros') as HTMLInputElement;
  const filtro: any = inputElement.value || null;

  this.generalService.buscarFiltro( filtro  )
          .subscribe( (resp: any) => {

            if( resp.length !== 0 ) {
              this.filtros = resp[0];
              this.totalFiltros = resp[1][0].cantCli;
            } else {
              this.totalFiltros = 0;
              this.filtros = resp[0];
            }
          });

}


// ==================================================
//        Borra una persona
// ==================================================

 eliminarFiltro( filtro: any ) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + filtro.Filtro,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    })
    .then( (borrar: any) => {

      if (borrar) {

        const parametro = filtro.IdFiltro.toString();

        this.generalService.eliminarFiltro( parametro )
                  .subscribe( (resp: any) => {
                      this.cargarFiltrosPaginado();
                      if ( resp.mensaje === 'Ok') {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Filtro eliminado',
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
                      this.cargarFiltrosPaginado();

                    });

                  }
                });
              }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalFiltros ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarFiltrosPaginado();

}



}
