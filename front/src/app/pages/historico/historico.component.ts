import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../services/persona/persona.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  historico: any[] = [];
  desde = 0;
  totalHistorico: any;
  date: any;

  Apellidos: any;
  Nombres: any;
  Patente: any;

  constructor(
    public personaService: PersonaService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarHistorico();
    this.cargarCliente();
  }

// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarCliente() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.personaService.dameCliente( this.date )
             .subscribe( (resp: any) => {

              console.log("resp es : ",resp)

              // this.Apellidos =  resp[0].Apellidos;
              // this.Nombres = resp[0].Nombres;
              // this.Patente =  resp[0].Patente;

              // this.cargando = false;

            });

}

// ==================================================
// Carga de
// ==================================================

cargarHistorico() {

    this.personaService.cargarHistorico( this.desde )
               .subscribe( (resp: any) => {

                this.historico = resp[0];

                // this.cargando = false;

              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalHistorico ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarHistorico();

}


}
