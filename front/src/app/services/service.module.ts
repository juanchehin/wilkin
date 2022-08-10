import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService,VerificaTokenGuard } from './service.index';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    PersonaService,
    // LoginGuardGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
