import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona!: any;
  personaValor!: any;
  personaId!: any;
  IdRol: any;
  token!: any;
  usuario: any;
  menu!: any;


  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarStorage();
    this.cargarPersonas();

  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================

// ==================================================
//        Logueo de la persona
// ==================================================
login(email: string, pass: string): any {

  const url = URL_SERVICIOS + '/login';

  var persona = {
    email,
    pass
  }

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

      this.IdRol = resp.IdRol;
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
// =========================================== PERSONAS ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar persona - Peticion GET al server
// ==================================================
cargarPersonas( desde: number = 0 ) {

  const url = URL_SERVICIOS + '/personas?desde=' + desde;

  return this.http.get( url );

}


// ==================================================
// Devuelve los roles de la BD
// ==================================================

dameRoles( ) {

  let url = URL_SERVICIOS + '/personas/roles/listar';

}
// ==================================================
//        Da de baja una persona
// ==================================================

bajaPersona( termino: string ) {

    let url = URL_SERVICIOS + '/personas/';
    url += '&termino=' + termino;
    url += '&IdRol=' + this.IdRol;

}

// ==================================================
//        Obtiene una persona de la BD
// ==================================================

damePersona( termino: string ): any {


  const url = URL_SERVICIOS + '/personas/' + termino;

  return this.http.get(url);

}


// ==================================================
//        Busca una persona por termino
// ==================================================

  buscarPersona( termino: string ) {

    const url = URL_SERVICIOS + '/personas/busqueda/' + termino;

    // return this.http.get(url)
    //         .map( (resp: any) => resp[0]);
  }


// ====================================================================================================================
// =========================================== CLIENTES ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar clientes - Peticion GET al server
// ==================================================
cargarClientesPlanEstado( desde: number = 0 , IdPlan: any) {

  let url = URL_SERVICIOS + '/personas/clientes/plan/' + desde + '/' + IdPlan ;  // query
  url += '?IdRol=' + this.IdRol;

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);

}
// ==================================================
//  Activa un cliente (caso en que el cliente se dio de baja y desea reactivarse)
// ==================================================
activarCliente( IdPersona: any ) {

  let url = URL_SERVICIOS + '/personas/cliente/activar/' + IdPersona;
  url += '?IdRol=' + this.IdRol;

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
  url += '?IdRol=' + this.IdRol;

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

  // url += '?token=' + this.token;  // query
  url += '?IdRol=' + this.IdRol;

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

}
