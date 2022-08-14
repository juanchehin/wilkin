import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public GeneralService: GeneralService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {


    const token = this.GeneralService.token;  // TOKEN <-- String en base64
    const payload = JSON.parse( atob(token.split('.')[1]));  // <-- Obtengo la info del token, desde base64

    const expirado = this.expirado(payload.exp);

    if ( expirado ) {

      this.GeneralService.logout();
      return false;
    } else {

      return this.verificaRenueva(payload.exp);
    }
  }

// ==================================================
//        Renueva el token
// ==================================================

  verificaRenueva( fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject ) => {
      const tokenExp = new Date( fechaExp * 1000);
      const ahora = new Date();  // <-- Traer la fecha desde la BD por que esta es la fecha del sistema que puede ser modificada

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );  // Fecha actual + 4 hs


      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else{

        // this.GeneralService.renuevaToken()
        //   .subscribe( () => {
        //     resolve(true);
        //   }, () => {
        //     this.router.navigate(['/login']);
        //     reject(false);
        //   });
      }

      resolve(true);

    });
  }

// ==================================================
//        Verifica si el token expiro
// ==================================================

  expirado(fechaExp: number) {  // <-- Obtiene la fecha de expiracion del token
    const ahora = new Date().getTime() / 1000;  // <-- Fecha actual en [ms]

    if( fechaExp < ahora ){
      return true;
    } else{
      return false;
    }
  }
}
