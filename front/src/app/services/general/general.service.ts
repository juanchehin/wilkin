import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  persona!: any;
  personaValor!: any;
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

      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
      this.cargarStorage();

      return true;
    }));


}

// ==================================================
//        Guarda la info en el localstorage
//  Guarda en el storage la informacion recibida por parametros
// ==================================================
guardarStorage( id: string, token: string, usuario: any, menu: any ) {

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

// ==================================================
//        Cargar
// ==================================================
cargarHistorico( IdCliente: string ,desde: number = 0 ) {

  let url = URL_SERVICIOS + '/personas/clientes/historico/' + IdCliente + '/' + desde;  // query

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);


}


// ==================================================
//        Cargar
// ==================================================
dameTrabajo( IdTrabajo: string  ) {

  let url = URL_SERVICIOS + '/personas/trabajo/' + IdTrabajo;  // query

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
  );
}
// ====================================================================================================================
// =========================================== CLIENTES ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar clientes - Peticion GET al server
// ==================================================
cargarClientes( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/personas/clientes/listar/' + desde;  // query

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
//
// ==================================================

dameCliente( IdCliente: string  ): any {

  const url = URL_SERVICIOS + '/personas/clientes/dame/' + IdCliente;

  return this.http.get(url);

}

// ==================================================
//        Crear cliente
// ==================================================
crearCliente( Apellidos : string, Nombres: string, Telefono: string  ,Patente : string,Correo: string , Direccion : string, Modelo: string,Observaciones: string ) {

  var cliente = [
    Apellidos,
    Nombres,
    Telefono,
    Patente,
    Correo,
    Direccion,
    Modelo,
    Observaciones
  ]

  let url = URL_SERVICIOS + '/personas/clientes/alta';

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

eliminarCliente( IdCliente: any ) {

  let url = URL_SERVICIOS + '/personas/clientes/baja/' + IdCliente;

  return this.http.put(
    url,
    IdCliente,
    {
      headers: {
        token: this.token
      }
    }
);

}

// ==================================================
//        Editar Cliente
// ==================================================

editarCliente(
    IdCliente : string,
    Apellidos : string,
    Nombres : string,
    Telefono : string,
    Patente : string,
    Correo : string,
    Direccion : string,
    Modelo : string,
    Observaciones : string
 ) {

  let url = URL_SERVICIOS + '/personas/clientes/actualizar/' + IdCliente;

  var cliente = {
    Apellidos,
    Nombres,
    Telefono,
    Patente,
    Correo,
    Direccion,
    Modelo,
    Observaciones
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
//        Busca una persona por termino
// ==================================================

buscarPatente( termino: string ) {

  const url = URL_SERVICIOS + '/personas/clientes/patente/' + termino;

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
  )
}


// ==================================================
//
// ==================================================

buscarCliente( Apellidos: string , Nombres: string  ): any {

  const url = URL_SERVICIOS + '/personas/clientes/busqueda/' + Apellidos + '/' + Nombres;

  return this.http.get(url);

}

// ====================================================================================================================
// =========================================== Aceites ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar Aceites - Peticion GET al server
// ==================================================
cargarAceitesPaginado( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/aceites/listar/' + desde;  // query

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);

}

// ==================================================
//
// ==================================================

dameAceite( IdAceite: string  ): any {

  const url = URL_SERVICIOS + '/aceites/dame/' + IdAceite;

  return this.http.get(url);

}

// ==================================================
//        Crear
// ==================================================
crearAceite( pAceite : string, Descripcion: string) {

  let url = URL_SERVICIOS + '/aceites/alta';

  var Aceite = {
    pAceite,
    Descripcion
  }

  return this.http.post(
    url,
    Aceite,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
//        Elimina un Aceite
// ==================================================

eliminarAceite( IdAceite: any ) {

  let url = URL_SERVICIOS + '/aceites/eliminar/' + IdAceite;

  return this.http.put(
    url,
    IdAceite,
    {
      headers: {
        token: this.token
      }
    }
);

}

// ==================================================
//        Editar Aceite
// ==================================================

editarAceite(
    IdAceite : string,
    Aceite : string,
    Descripcion : string
 ) {

  let url = URL_SERVICIOS + '/aceites/actualizar/' + IdAceite;

  var aceite = {
    Aceite,
    Descripcion
  }


  return this.http.put(url ,
    aceite,
     {
      headers: {
        token: this.token
      }
    }
  );

}

// ==================================================
//        Busca una Aceite por termino
// ==================================================

buscarAceite( termino: string ) {

  const url = URL_SERVICIOS + '/aceites/buscar/' + termino;

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
  )
}


// ==================================================
//        Cargar Filtros - Peticion GET al server
// ==================================================
dameTodosAceites( ) {

  let url = URL_SERVICIOS + '/aceites/listar/';  // query

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);

}


// ====================================================================================================================
// =========================================== Filtros ===================================================================
// ====================================================================================================================
// ==================================================
//        Cargar Filtros - Peticion GET al server
// ==================================================
dameTodosFiltros( ) {

  let url = URL_SERVICIOS + '/filtros/listar/';  // query

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);

}

// ==================================================
//        Cargar Filtros - Peticion GET al server
// ==================================================
cargarFiltrosPaginado( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/filtros/listar/' + desde;  // query

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);

}

// ==================================================
//
// ==================================================

dameFiltro( IdFiltro: string  ): any {

  const url = URL_SERVICIOS + '/filtros/dame/' + IdFiltro;

  return this.http.get(url);

}

// ==================================================
//        Crear
// ==================================================
crearFiltro( pFiltro : string, Descripcion: string) {

  let url = URL_SERVICIOS + '/filtros/alta';

  var Filtro = {
    pFiltro,
    Descripcion
  }

  return this.http.post(
    url,
    Filtro,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
//        Elimina un Filtro
// ==================================================

eliminarFiltro( IdFiltro: any ) {

  let url = URL_SERVICIOS + '/filtros/eliminar/' + IdFiltro;

  return this.http.put(
    url,
    IdFiltro,
    {
      headers: {
        token: this.token
      }
    }
);

}

// ==================================================
//        Editar Filtro
// ==================================================

editarFiltro(
    IdFiltro : string,
    Filtro : string,
    Descripcion : string
 ) {

  let url = URL_SERVICIOS + '/filtros/actualizar/' + IdFiltro;

  var filtro = {
    Filtro,
    Descripcion
  }


  return this.http.put(url ,
    filtro,
     {
      headers: {
        token: this.token
      }
    }
  );

}

// ==================================================
//        Busca una persona por termino
// ==================================================

buscarFiltro( termino: string ) {

  const url = URL_SERVICIOS + '/filtros/buscar/' + termino;

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
  )
}


// ==================================================
//  /********      Trabajos  *******************
// ==================================================



// ==================================================
//        Crear trabajo
// ==================================================
altaTrabajo( IdCliente: string,Kilometros : string, Aceite: string, Filtro: string  ,Correa : string,TensorDist: string , PastillaFreno : string, CambioRef: string,CambioBujia: string
  ,CambioComb : string, CambioFiltroAceite: string,CorreaDist: string,BombaAgua : string,CambioAA : string,CambioAceite : string,Observaciones: string ) {

  var trabajo = [
  Kilometros,
  Aceite,
  Filtro ,
  Correa ,
  TensorDist  ,
  PastillaFreno ,
  CambioRef ,
  CambioBujia,
  CambioComb,
  CambioFiltroAceite,
  CorreaDist,
  BombaAgua,
  CambioAA,
  CambioAceite,
  Observaciones
  ]

  let url = URL_SERVICIOS + '/personas/trabajos/alta/' + IdCliente;

  return this.http.post(
    url,
    trabajo,
    {
      headers: {
        token: this.token
      }
    }
);

}


}
