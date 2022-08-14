import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/services/general/general.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarfiltro',
  templateUrl: './editarfiltro.component.html',
  styles: []
})
export class EditarfiltroComponent implements OnInit {

  forma!: FormGroup;
  filtro: any;
  Filtro!: string;
  Descripcion!: string;

  cargando = true;
  private date!: any;

  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.cargarFiltro();
  }

  ngOnInit() {

    this.forma = new FormGroup({
        Filtro: new FormControl(null, Validators.required ),
        Descripcion: new FormControl(''),
      });

  }
// ==================================================
//  Carga el Filtro con sus datos para mostrar en el formulario
// ==================================================

cargarFiltro() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.generalService.dameFiltro( this.date )
             .subscribe( (resp: any) => {

              this.filtro = resp[0];

              this.Filtro = this.filtro.Filtro;
              this.Descripcion =  this.filtro.Descripcion;

              this.cargando = false;

            });

}

// =================================================
//        Actualiza Filtro
// ==================================================

actualizaFiltro( ) {


  this.generalService.editarFiltro(
    this.date,
    this.forma.value.Filtro || this.Filtro,
    this.forma.value.Descripcion || this.Descripcion)

             .subscribe( (resp: any) => {

              if ( resp.Mensaje === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Filtro actualizado',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/filtros']);
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
