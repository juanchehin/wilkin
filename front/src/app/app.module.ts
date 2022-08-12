import { NgModule } from '@angular/core';
// Rutas
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
