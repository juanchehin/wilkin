import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-detalle-historico',
  templateUrl: './detalle-historico.component.html',
  styles: []
})
export class DetalleHistoricoComponent implements OnInit {

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
    public GeneralService: GeneralService,
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

  this.GeneralService.dameCliente( this.date )
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

    this.GeneralService.cargarHistorico( this.date, this.desde )
               .subscribe( (resp: any) => {

                console.log("historico detalle cliente es : ",resp)

                this.historicos = resp[0];

                this.Aceite = resp[0][0].Aceite;
                this.Filtro = resp[0][0].Filtro;
                this.CorreaDist = resp[0][0].CorreaDist;
                this.Correa = resp[0][0].Correa;
                this.TensorDist = resp[0][0].TensorDist;
                this.BombaAgua = resp[0][0].BombaAgua;
                this.PastillaFreno = resp[0][0].PastillaFreno;
                this.CambioRef = resp[0][0].CambioRef;
                this.CambioBujia = resp[0][0].CambioBujia;
                this.CambioAceite = resp[0][0].CambioAceite;
                this.CambioFiltroAceite = resp[0][0].CambioFiltroAceite;
                this.CambioFiltroAgua = resp[0][0].CambioFiltroAgua;
                this.CambioComb = resp[0][0].CambioComb;
                this.CambioAA = resp[0][0].CambioAA;
                this.Fecha = resp[0][0].Fecha;
                this.Kilometros = resp[0][0].Kilometros;

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
