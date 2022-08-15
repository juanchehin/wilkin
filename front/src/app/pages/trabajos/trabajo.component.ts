import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/services/general/general.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styles: []
})
export class TrabajoComponent implements OnInit {

  forma!: FormGroup;
  persona: any;
  filtros: any;
  aceites: any;
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
    this.cargarAceites();
  }

  ngOnInit() {

    this.forma = new FormGroup({
      Kilometros: new FormControl(null, Validators.required ),
      Aceite: new FormControl(null, Validators.required ),
      Filtro: new FormControl(null, Validators.required ),
      CorreaDist: new FormControl(null , Validators.required),
      Correa: new FormControl(null , Validators.required),
      TensorDist: new FormControl( null , Validators.required),
      BombaAgua: new FormControl( null, Validators.required ),
      PastillaFreno: new FormControl( null , Validators.required),
      CambioRef: new FormControl(null, Validators.required),

      CambioBujia: new FormControl(null, Validators.required ),
      // CambioAceite: new FormControl(null , Validators.required),
      CambioFiltroAceite: new FormControl( null , Validators.required),
      CambioFiltroAgua: new FormControl( null , Validators.required),
      CambioComb: new FormControl( null , Validators.required),
      CambioAA: new FormControl(null, Validators.required),
      Observaciones: new FormControl(''),
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
//  Carga
// ==================================================

cargarAceites() {

  this.generalService.dameTodosAceites( )
             .subscribe( (resp: any) => {

              this.aceites = resp[0];

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

  this.generalService.altaTrabajo(
  this.date,
  this.forma.value.Kilometros,
  this.forma.value.Aceite,
  this.forma.value.Filtro ,
  this.forma.value.Correa ,
  this.forma.value.TensorDist  ,
  this.forma.value.PastillaFreno ,
  this.forma.value.CambioRef ,
  this.forma.value.CambioBujia,
  this.forma.value.CambioComb,
  this.forma.value.CambioFiltroAceite,
  this.forma.value.CambioFiltroAgua,
  this.forma.value.CorreaDist,
  this.forma.value.BombaAgua,
  this.forma.value.CambioAA,
  this.forma.value.CambioAceite,
  this.forma.value.Observaciones
   )
            .subscribe( (resp: any) => {


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/
                // tslint:disable-next-line: align
                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Trabajo cargado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/clientes']);
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
                );
  return;
}
}
