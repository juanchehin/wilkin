import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona/persona.service';
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
    public personaService: PersonaService,
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

    if (this.personaService.estaLogueado()) {

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

  this.personaService.logout();
}

}
