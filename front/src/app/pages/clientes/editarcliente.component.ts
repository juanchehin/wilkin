import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/service.index';
declare var Swal: any;
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editarcliente',
  templateUrl: './editarcliente.component.html',
  styles: []
})
export class EditarclienteComponent implements OnInit {

  forma!: FormGroup;
  persona: any;

  Apellidos!: string;
  Nombres!: string;
  Telefono!: string;
  Patente!: string;
  Correo!: string;
  Direccion!: string;
  Modelo!: string;
  Observaciones!: string;

  cargando = true;
  private date!: any;

  constructor(public personaService: PersonaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.cargarCliente();
  }

  ngOnInit() {

    this.forma = new FormGroup({
        Apellidos: new FormControl(null, Validators.required ),
        Nombres: new FormControl(null, Validators.required ),
        Telefono: new FormControl(null ),
        Patente: new FormControl(null ),
        Correo: new FormControl( null ),
        Direccion: new FormControl( null ),
        Modelo: new FormControl( null ),
        Observaciones: new FormControl(''),
      });

  }
// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarCliente() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.personaService.dameCliente( this.date )
             .subscribe( (resp: any) => {

              this.persona = resp[0];

              this.Correo = this.persona.Correo;
              this.Apellidos =  this.persona.Apellidos;
              this.Nombres = this.persona.Nombres;
              this.Telefono =  this.persona.Telefono;
              this.Patente = this.persona.Patente;
              this.Modelo =  this.persona.Modelo;
              this.Direccion = this.persona.Direccion;
              this.Observaciones = this.persona.Observaciones;

              this.cargando = false;

            });

}

// =================================================
//        Actualiza Cliente
// ==================================================

actualizaCliente( ) {


  this.personaService.editarCliente(
    this.date,
    this.forma.value.Apellidos || this.Apellidos,
    this.forma.value.Nombres || this.Nombres,
    this.forma.value.Telefono || this.Telefono,
    this.forma.value.Patente || this.Patente,
    this.forma.value.Correo || this.Correo ,
    this.forma.value.Direccion || this.Direccion,
    this.forma.value.Modelo || this.Modelo,
    this.forma.value.Observaciones || this.Observaciones)

             .subscribe( (resp: any) => {

              if ( resp.Mensaje === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Cliente actualizado',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/clientes']);
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
