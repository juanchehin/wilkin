import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/service.index';

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
    public personaService: PersonaService
    ) { }
  ngOnInit() {

  }

}
