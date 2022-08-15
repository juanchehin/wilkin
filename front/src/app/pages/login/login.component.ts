import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public generalService: GeneralService,
    public router: Router
    ) { }
  ngOnInit() {
    this.generalService.logout();
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    this.generalService.login(forma.value.usuario,forma.value.password)
        .subscribe((resp: any) => {


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
