import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../services/general/general.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceites',
  templateUrl: './aceites.component.html',
  styles: []
})
export class AceitesComponent implements OnInit {

  aceites: any[] = [];
  desde = 0;
  totalAceites = 0;
  aceite: any;

  constructor(
    public generalService: GeneralService
  ) {
   }

  ngOnInit() {
    this.cargarAceitesPaginado();

  }

// ==================================================
// Carga de Aceites
// ==================================================

  cargarAceitesPaginado() {

    const buscarAceites: HTMLInputElement = document.getElementById('buscarAceites') as HTMLInputElement;
    buscarAceites.value = '';

    this.generalService.cargarAceitesPaginado( this.desde )
               .subscribe( (resp: any) => {

                this.totalAceites = resp[1][0].cantAceites;

                this.aceites = resp[0];

                // this.cargando = false;

              });

  }


// ==================================================
//  Busca el Aceites por nombre
// ==================================================

buscarAceite( ) {

  const inputElement: HTMLInputElement = document.getElementById('buscarAceites') as HTMLInputElement;
  const aceite: any = inputElement.value || null;

  this.generalService.buscarAceite( aceite  )
          .subscribe( (resp: any) => {

            if( resp.length !== 0 ) {
              this.aceites = resp[0];
              this.totalAceites = resp[1][0].cantAceites;
            } else {
              this.totalAceites = 0;
              this.aceites = resp[0];
            }
          });

}


// ==================================================
//        Borra un aceite
// ==================================================

 eliminarAceite( aceite: any ) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + aceite.Aceite,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    })
    .then( (borrar: any) => {

      if (borrar.isConfirmed) {

        const parametro = aceite.IdAceite.toString();

        this.generalService.eliminarAceite( parametro )
                  .subscribe( (resp: any) => {
                      this.cargarAceitesPaginado();
                      if ( resp.mensaje === 'Ok') {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Aceite eliminado',
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
                      this.cargarAceitesPaginado();

                    });

                  }
                });
              }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalAceites ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarAceitesPaginado();

}



}
