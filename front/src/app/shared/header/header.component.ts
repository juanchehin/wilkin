import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  correoActual: any;
  cargando = true;
  id!: number;

  constructor(
    public GeneralService: GeneralService,
    public router: Router ) {


    this.correoActual = localStorage.getItem('usuario'); // Cambiar esto y acceder desde el servicio, ver comentario de abajo
    this.comprobarLogueo();

    }

  ngOnInit() {

  }

// ==================================================
//        Funcion para comprobar si esta logueado actualmente
// ==================================================
  comprobarLogueo() {
    this.correoActual = localStorage.getItem('usuario');

    if (this.GeneralService.estaLogueado()) {

      return false;
    } else {

      return true;
    }
  }

// ==================================================
//        Funcion para mostrar/ocultar boton 'INICIAR SESION' - VER POR QUE CADA VEZ QUE SE TECLEA EN EL LOGIN SE ACCEDE AQUI, RALENTIZA
// ==================================================
  paginaInicioSesion() {
    if (this.router.url === '/login') {
      return false;
    } else {
      return true;
    }
  }

// ==================================================
//
// ==================================================
logout() {

  this.GeneralService.logout();
}

}
