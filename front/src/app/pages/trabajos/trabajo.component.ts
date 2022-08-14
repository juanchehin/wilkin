import { Component, OnInit } from '@angular/core';
declare var Swal: any;
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styles: []
})
export class TrabajoComponent implements OnInit {

  forma!: FormGroup;
  persona: any;
  filtros: any;
  fechaHoy = new Date();

  Apellidos: any;
  Nombres: any;
  Patente: any;
  IdCliente: any;

  Aceite: any;
  Filtro: any;
  CorreaDist: any;
  Correa: any;
  TensorDist: any;
  BombaAgua: any;
  PastillaFreno: any;
  CambioRef: any;
  CambioBujia: any;
  CambioAceite: any;
  CambioFiltroAceite: any;
  CambioFiltroAgua: any;
  CambioComb: any;
  CambioAA: any;
  Fecha: any;
  Kilometros: any;

  cargando = true;
  private date!: any;

  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.cargarCliente();
    this.cargarFiltros();
  }

  ngOnInit() {

    this.forma = new FormGroup({
      Kilometros: new FormControl(null ),
      Aceite: new FormControl(null, Validators.required ),
      Filtro: new FormControl(null, Validators.required ),
      CorreaDist: new FormControl(null ),
      Correa: new FormControl(null ),
      TensorDist: new FormControl( null ),
      BombaAgua: new FormControl( null ),
      PastillaFreno: new FormControl( null ),
      CambioRef: new FormControl(''),

      CambioBujia: new FormControl(null ),
      CambioAceite: new FormControl(null ),
      CambioFiltroAceite: new FormControl( null ),
      CambioFiltroAgua: new FormControl( null ),
      CambioComb: new FormControl( null ),
      CambioAA: new FormControl(''),

      });

  }
// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarCliente() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.generalService.dameCliente( this.date )
             .subscribe( (resp: any) => {

              this.persona = resp[0];

              this.Apellidos =  this.persona.Apellidos;
              this.Nombres = this.persona.Nombres;
              this.Patente = this.persona.Patente;

              this.cargando = false;

            });

}

// ==================================================
//  Carga
// ==================================================

cargarFiltros() {

  this.generalService.dameTodosFiltros( )
             .subscribe( (resp: any) => {

              this.filtros = resp[0];

              this.cargando = false;

            });

}

// ==================================================
//        Nuevo cliente
// ==================================================

altaTrabajo() {

  if ( this.forma.invalid ) {
    return;
  }

  this.generalService.crearCliente(
  this.forma.value.Apellidos,
  this.forma.value.Nombres,
  this.forma.value.Telefono ,
  this.forma.value.Patente ,
  this.forma.value.Correo  ,
  this.forma.value.Direccion ,
  this.forma.value.Modelo ,
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
                        // this.parametro = resp.pIdPersona;
                        // if (activar) {
                        //   this.activarCliente(this.parametro);
                        //   return;
                        // }
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
}
