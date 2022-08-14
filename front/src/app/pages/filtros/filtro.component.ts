import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html'
})
export class FiltroComponent implements OnInit {

  forma!: FormGroup;
  respuesta: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;

  constructor(
    public generalService: GeneralService,
    private router: Router
  ) {
   }


  ngOnInit() {


    this.forma = new FormGroup({
      Filtro: new FormControl(null, Validators.required ),
      Descripcion: new FormControl(null, Validators.required )
    })

  }


// ==================================================
//        Nuevo cliente
// ==================================================

  altaFiltro() {

    if ( this.forma.invalid ) {
      return;
    }

    this.generalService.crearFiltro(
    this.forma.value.Filtro,
    this.forma.value.Descripcion
    )
              .subscribe( (resp: any) => {

                  /*  Transformar resp.mensaje a JSON para que se pueda acceder*/
                  // tslint:disable-next-line: align
                  if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Filtro cargado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/filtros']);
                  } else {
                    if (resp.Mensaje === 'El filtro ya se encuentra cargada') {
                        Swal.fire({
                          title: 'Filtro ya cargado',
                          text: '¿Desea Reactivarlo?',
                          icon: 'info',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Si, activar'
                        })
                        .then( (activar: any) => {
                          this.parametro = resp.pIdPersona;
                          if (activar) {
                            this.activarCliente(this.parametro);
                            return;
                          }
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Hubo un problema al cargar',
                          text: resp.Mensaje
                        });
                      }
                    return;
                    // tslint:disable-next-line: align
                    }
                  });
    return;
  }

// ==================================================
//        Activar cliente
// ==================================================

activarCliente(IdPersona: any) {

  const parametro = JSON.stringify(IdPersona);

  this.generalService.activarCliente( parametro )
            .subscribe( (resp1: any) => {
                // this.cargarClientes();
                if ( resp1.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cliente Reactivado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/clientes']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al activar',
                    text: 'Contactese con el administrador',
                  });
                }
              });
}

}

