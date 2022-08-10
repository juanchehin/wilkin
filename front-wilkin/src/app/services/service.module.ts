import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, PersonaService, LoginGuardGuard, AsistenciaService, AdminGuard, VerificaTokenGuard, SettingsService } from './service.index';
import { HeaderService } from './header/header.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SettingsService,
    HeaderService,
    PersonaService,
    AsistenciaService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
