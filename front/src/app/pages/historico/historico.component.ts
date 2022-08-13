import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../services/persona/persona.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styles: []
})
export class HistoricoComponent implements OnInit {

  historicos: any[] = [];
  desde = 0;
  totalHistorico: any;
  date: any;

  Apellidos: any;
  Nombres: any;
  Patente: any;
  IdCliente: any;

  Aceite: any;
  Filtro: any;
  CorreaDist: any;
  Correa: any;
  TensorDist: any;
  BombaAgua: any;
  PastillaFreno: any;
  CambioRef: any;
  CambioBujia: any;
  CambioAceite: any;
  CambioFiltroAceite: any;
  CambioFiltroAgua: any;
  CambioComb: any;
  CambioAA: any;
  Fecha: any;
  Kilometros: any;

  constructor(
    public personaService: PersonaService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarCliente();
    this.cargarHistorico();
  }

// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarCliente() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.personaService.dameCliente( this.date )
             .subscribe( (resp: any) => {

              this.IdCliente = resp[0].IdCliente;
              this.Apellidos =  resp[0].Apellidos;
              this.Nombres = resp[0].Nombres;
              this.Patente =  resp[0].Patente;



              // this.cargando = false;

            });

}

// ==================================================
// Carga de
// ==================================================

cargarHistorico() {

    this.personaService.cargarHistorico( this.date, this.desde )
               .subscribe( (resp: any) => {

                console.log("historico cliente es : ",resp)

                this.historicos = resp[0];

                this.Aceite = resp[0].Aceite;
                this.Filtro = resp[0].Filtro;
                this.CorreaDist = resp[0].CorreaDist;
                this.Correa = resp[0].Correa;
                this.TensorDist = resp[0].TensorDist;
                this.BombaAgua = resp[0].BombaAgua;
                this.PastillaFreno = resp[0].PastillaFreno;
                this.CambioRef = resp[0].CambioRef;
                this.CambioBujia = resp[0].CambioBujia;
                this.CambioAceite = resp[0].CambioAceite;
                this.CambioFiltroAceite = resp[0].CambioFiltroAceite;
                this.CambioFiltroAgua = resp[0].CambioFiltroAgua;
                this.CambioComb = resp[0].CambioComb;
                this.CambioAA = resp[0].CambioAA;
                this.Fecha = resp[0].Fecha;
                this.Kilometros = resp[0].Kilometros;

                this.totalHistorico = resp[1][0].cantHistorico;

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
