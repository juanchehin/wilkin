import { NgModule } from '@angular/core';
// Rutas
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';

import { ServiceModule } from './services/service.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    APP_ROUTES,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
