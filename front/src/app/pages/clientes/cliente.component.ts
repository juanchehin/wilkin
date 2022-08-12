import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonaService } from '../../services/service.index';
// import Swal from 'sweetalert2';
// const Swal = require('sweetalert2');
declare var Swal: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  forma!: FormGroup;
  respuesta: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;

  constructor(
    public personaService: PersonaService,
    private router: Router
  ) {
   }


  ngOnInit() {


    this.forma = new FormGroup({
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      Telefono: new FormControl(null ),
      Observaciones: new FormControl(''),
      Correo: new FormControl( null , [Validators.required , Validators.email ]),
    })

  }


// ==================================================
//        Nuevo cliente
// ==================================================

  registrarCliente() {

    if ( this.forma.invalid ) {
      return;
    }

    this.personaService.crearCliente(this.forma.value.Apellidos,
      this.forma.value.Nombres,
      this.forma.value.Telefono,this.forma.value.Correo,
      this.forma.value.Observaciones )
              .subscribe( (resp: any) => {

                  /*  Transformar resp.mensaje a JSON para que se pueda acceder*/
                  // tslint:disable-next-line: align
                  if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Cliente cargado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/clientes']);
                  } else {
                    if (resp.Mensaje === 'La persona ya se encuentra cargada') {
                        Swal.fire({
                          title: 'Persona ya cargada',
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

  this.personaService.activarCliente( parametro )
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

