import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  persona!: any;
  personaId!: any;
  token!: any;
  usuario: any;


  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarStorage();

  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================

// ==================================================
//        Logueo de la persona
// ==================================================
login(usuario: string, pass: string): any {

  const url = URL_SERVICIOS + '/login';

  var persona = {
    usuario,
    pass
  }

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu, resp.IdRol);
      this.cargarStorage();

      return true;
    }));


}

// ==================================================
//        Guarda la info en el localstorage
//  Guarda en el storage la informacion recibida por parametros
// ==================================================
guardarStorage( id: string, token: string, usuario: any, menu: any, IdRol: any ) {

  localStorage.setItem('token', token );

  this.token = token;
}

// ==================================================
// Carga la informacion almacenada en el localstorage a la informacion actual para que
// pueda ser accesada desde este servicio
// ==================================================
  cargarStorage() {

    if ((localStorage.getItem('token') === 'undefined') || (localStorage.getItem('token') === null)) {
      this.token = '';

    } else {
      const var1 = localStorage.getItem('token');

    }

  }

// ==================================================
//        Permite saber si un usuario esta logueado
// ==================================================
estaLogueado() {

  this.token = localStorage.getItem('token');
  if ((this.token === 'undefined') || (this.token === null)) {
    return false;
  } else {
    return( this.token.length > 5) ? true : false;

  }
}

// ==================================================
//        Renueva TOKEN
// ==================================================
  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';

  }

// ==================================================
//        Hace el logout del usuario
// ==================================================

logout() {
  this.token = '';
  this.personaId = null;
  this.usuario = null;

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);
}

// ====================================================================================================================
// =========================================== CLIENTES ===================================================================
// ====================================================================================================================


// ==================================================
//  Activa un cliente (caso en que el cliente se dio de baja y desea reactivarse)
// ==================================================
activarCliente( IdPersona: any ) {

  let url = URL_SERVICIOS + '/personas/cliente/activar/' + IdPersona;

  return this.http.put(
    url,
    IdPersona,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
// Busca una persona en la BD dado su ID y el ID del plan al cual esta inscripto
// ==================================================

buscarClientePorPlan( Apellidos: string , Nombres: string , IdPlan: string  ): any {

  const url = URL_SERVICIOS + '/personas/busqueda/plan/' + Apellidos + '/' + Nombres  + '/' + IdPlan;

  return this.http.get(url);

//    return this.http.get(url)
//           .map( (resp: any) => resp[0]);
}

// ==================================================
//        Crear cliente
// ==================================================
crearCliente( Apellidos : string, Nombres: string, Telefono: string  ,Correo : string,Observaciones: string ) {

  var cliente = [
    Apellidos,
    Nombres,
    Telefono,
    Correo,
    Observaciones
  ]

  let url = URL_SERVICIOS + '/personas/cliente';

  return this.http.post(
    url,
    cliente,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
//        Elimina un cliente
// ==================================================

eliminarCliente( IdPersona: any ) {

  let url = URL_SERVICIOS + '/personas/cliente/eliminar/' + IdPersona;

  return this.http.put(
    url,
    IdPersona,
    {
      headers: {
        token: this.token
      }
    }
);

  // return this.http.delete(url );
}

// ==================================================
//        Editar Cliente
// ==================================================

editarCliente( Apellidos : string,
  Nombres : string,
   Observaciones : string,
   Telefono : string,
 Correo : string ) {

  // const id = cliente.IdPersona;
  const id = 1;

  let url = URL_SERVICIOS + '/cliente/actualizar/' + id;

  // url += '?token=' + this.token;  // query
  // url += '?IdRol=' + this.IdRol;

  var cliente = {
    Apellidos,
    Nombres,
    Observaciones,
    Telefono,
    Correo
  }


  return this.http.put(url ,
     cliente,
     {
      headers: {
        token: this.token
      }
    }
  );

}


// ==================================================
//
// ==================================================
cargarHistorico( IdCliente: number ) {

  const url = URL_SERVICIOS + '/personas/cliente/historico/' + IdCliente;

  return this.http.get( url );

}


}
