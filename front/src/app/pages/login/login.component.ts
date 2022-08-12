import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonaService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public personaService: PersonaService,
    public router: Router
    ) { }
  ngOnInit() {
    this.personaService.logout();
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    this.personaService.login(forma.value.usuario,forma.value.password)
        .subscribe((resp: any) => {

          console.log("resp es : ",resp);

          if ( resp === true) {
            this.router.navigate(['/principal']);
            return;
          }

          Swal.fire({
            icon: 'error',
            title: 'Error de credenciales',
            text: 'Error de credenciales',
          });
      },
      ( error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: 'Contactese con el administrador',
          });
      }

      );

  }

}
