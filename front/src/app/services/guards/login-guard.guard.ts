import { Injectable } from '@angular/core';
import { CanActivate, Router, Routes } from '@angular/router';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public GeneralService: GeneralService, public router: Router) {
  }
  canActivate() {
    if ( this.GeneralService.estaLogueado()) {
      return true;
     } else {
       this.router.navigate(['/login']);
       return false;
    }
  }

}
