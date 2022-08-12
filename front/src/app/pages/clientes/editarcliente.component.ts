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
  sonIguales = false;
  banderaPass = false;

  public imgTemp: any = null;

  Correo!: string;
  Password!: string;

  Apellidos!: string;
  Nombres!: string;
  Telefono!: string;
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
        Documento: new FormControl(null, Validators.required ),
        Telefono: new FormControl(null ),
        Observaciones: new FormControl(''),
        Correo: new FormControl( null , [Validators.required , Validators.email ]),


      });

  }
// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarCliente() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  // this.personaService.damePersona( this.date )
  //            .subscribe( (resp: any) => {

  //             console.log("resp es : ",resp)
  //             this.persona = resp[0];

  //             this.Correo = this.persona.Correo;
  //             this.Password =  this.persona.Password;
  //             this.Apellidos =  this.persona.Apellidos;
  //             this.Nombres = this.persona.Nombres;
  //             this.Telefono =  this.persona.Telefono;
  //             this.Observaciones = this.persona.Observaciones;

  //             this.cargando = false;

  //           });

}

// =================================================
//        Actualiza Cliente
// ==================================================

actualizaCliente( ) {


  this.personaService.editarCliente( this.forma.value.Apellidos || this.Apellidos,
     this.forma.value.Nombres || this.Nombres,
      this.forma.value.Observaciones || this.Observaciones,
      this.forma.value.Telefono || this.Telefono
    ,this.forma.value.Correo || this.Correo )

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
