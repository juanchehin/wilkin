import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
// import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    // { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
