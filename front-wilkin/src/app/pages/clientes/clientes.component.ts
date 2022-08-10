import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../../models/profesional.model';
import { PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { MedicionService } from 'src/app/services/medicion/medicion.service';
import { Cliente } from 'src/app/models/cliente.model';
import { AsistenciaService } from '../../../services/asistencia/asistencia.service';
import { Asistencia } from '../../../models/asistencia.model';
import { PlanService } from 'src/app/services/plan/plan.service';

// para generar pdfs lado cliente
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var swal: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  personas: Profesional[] = [];
  clientes: Cliente[] = [];
  asistencias: Asistencia[] = [];
  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  planes!: any;
  cantPlanes = 0;

  totalClientes = 0;
  cargando = true;
  planSeleccionado = 0;  // Parametro seleccionado en el SELECT de planes
  estadoSeleccionado = 'N';  // Parametro seleccionado en el SELECT de los estados de clientes

  carnet_PDF: any;

  greeting = 'Can you see me';
  url = 'http://pdfmake.org';
  longText = 'The amount of data that can be stored in the QR code symbol depends on the datatype (mode, or input character set), version (1, …, 40, indicating the overall dimensions of the symbol), and error correction level. The maximum storage capacities occur for 40-L symbols (version 40, error correction level L):'


  logo = 'data:image/jpeg;base64,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'


  constructor(
    public personaService: PersonaService,
    public medicionService: MedicionService,
    public asistenciaService: AsistenciaService,
    public planService: PlanService
  ) {
    this.planSeleccionado = 0;
   }

  ngOnInit() {
    this.cargarClientes();
    this.cargarPlanes();

  }

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
onChange(nuevoValor: any) {

  console.log("nuevo valor : ",nuevoValor);
}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambios(nuevoValor: any) {

    this.planSeleccionado = nuevoValor;

    this.cargarClientes();
}

// ==================================================
// Detecta los cambios en el select de los clientes activos/inactivos
// ==================================================
cambiosEstado(nuevoEstado: any) {

  this.estadoSeleccionado = nuevoEstado;


  this.cargarClientes();

}

// ==================================================
// Carga de clientes y filtra por dados de baja/alta/todos
// Ademas filtra por plan
// 0 : Dados de alta
// -1 : Todos
// ==================================================

  cargarClientes() {

    const buscarApellido: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    buscarApellido.value = '';

    const buscarNombre: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    buscarNombre.value = '';

    this.personaService.cargarClientesPlanEstado( this.desde , this.planSeleccionado )
               .subscribe( (resp: any) => {

                this.totalClientes = resp[1][0].cantCli;

                this.clientes = resp[0];

                this.cargando = false;

              });

  }

// ==================================================
//        Carga los planes activos
// ==================================================

cargarPlanes() {

  this.cargando = true;

  this.planService.cargarTodasPlanes( )
             .subscribe( (resp: any) => {


              this.planes = resp[0];

              this.cantPlanes = resp[1][0].cantPlanes;

              this.cargando = false;

            });

}


// ==================================================
//  Busca un cliente por plan o por todos
// ==================================================

  buscarCliente( ) {

    const inputElement: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    const Apellidos: any = inputElement.value || null;

    const inputElement1: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    const Nombres: any = inputElement1.value || null;

    this.personaService.buscarClientePorPlan( Apellidos, Nombres , this.planSeleccionado.toString()  )
            .subscribe( (resp: any) => {

              if( resp.length !== 0 ) {
                this.clientes = resp[0];
                this.totalClientes = resp[1][0].cantCli;
              } else {
                this.totalClientes = 0;
                this.clientes = resp[0];
              }
            });

  }

// ==================================================
//    Marca la asistencia de un determinado cliente dado un plan
// ==================================================

marcarAsistencia(IdPersona: number) {

  this.asistenciaService.marcarAsistenciaPersona( IdPersona )
              .subscribe( (resp: any) => {


               if ( resp.Mensaje === 'Ok') {
                 Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   title: 'Asistencia Marcada',
                   showConfirmButton: false,
                   timer: 2000
                 });
               } else {
                 Swal.fire({
                   icon: 'error',
                   title: 'Asistencias agotadas',
                   text: 'Sin asistencias para el plan',
                 });
               }
               this.cargarClientes();

             });

 }


// ==================================================
//        Borra una persona
// ==================================================

 eliminarCliente( cliente: any ) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + cliente.Nombres + ' ' + cliente.Apellidos,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    })
    .then( borrar => {

      if (borrar) {

        const parametro = cliente.IdPersona.toString();

        this.personaService.eliminarCliente( parametro )
                  .subscribe( (resp: any) => {
                      this.cargarClientes();
                      if ( resp.mensaje === 'Ok') {
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Cliente eliminado',
                          showConfirmButton: false,
                          timer: 2000
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al eliminar',
                          text: 'Contactese con el administrador',
                        });
                      }
                      this.cargarClientes();

                    });

                  }
                });
              }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalClientes ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarClientes();

}


header(text: any) {
	return { text: text, margins: [0, 0, 0, 8] };
}

// ==================================================
// PDF - Carnet
// ==================================================
ver() {

  this.armaPDF();
}


private armaPDF() {
    this.carnet_PDF = {
      pageSize: 'C8',
      content: [
        {
          columns: [
            {
              text: 'Aqui va la foto'
            },
            {
              text: 'Apellido y nombre'
            },
            {
              text: 'QR.'
            }
          ]
        },
        this.header(this.greeting),
    		{ qr: this.greeting },
    		'\n',
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };

    pdfMake.createPdf(this.carnet_PDF).open();

}



}
