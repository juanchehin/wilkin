import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent implements OnInit {

  persona: any = '';
  cargando = false;
  date: any;

  IdPersona = '0';

  constructor(
    public generalService: GeneralService
    ) { }
  ngOnInit() {

  }

}
