import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/services/general/general.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editaraceite',
  templateUrl: './editaraceite.component.html',
  styles: []
})
export class EditaraceiteComponent implements OnInit {

  forma!: FormGroup;
  aceite: any;
  Aceite!: string;
  Descripcion!: string;

  cargando = true;
  private date!: any;

  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.cargarAceite();
  }

  ngOnInit() {

    this.forma = new FormGroup({
        Aceite: new FormControl(null, Validators.required ),
        Descripcion: new FormControl(''),
      });

  }
// ==================================================
//  Carga el Aceite con sus datos para mostrar en el formulario
// ==================================================

cargarAceite() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.generalService.dameAceite( this.date )
             .subscribe( (resp: any) => {

              this.aceite = resp[0];

              this.Aceite = this.aceite.aceite;
              this.Descripcion =  this.aceite.Descripcion;

              this.cargando = false;

            });

}

// =================================================
//        Actualiza Aceite
// ==================================================

actualizaAceite( ) {


  this.generalService.editarAceite(
    this.date,
    this.forma.value.Aceite || this.Aceite,
    this.forma.value.Descripcion || this.Descripcion)

             .subscribe( (resp: any) => {

              if ( resp.Mensaje === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Aceite actualizado',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/aceites']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al actualizar',
                  text: resp.Mensaje,
                });
                return;
              }
             });
}


}
