import { Component, OnInit } from '@angular/core';

import { ServicosService } from 'src/app/services/servicos.service';
import { Servico } from 'src/app/models/servico.model';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  public servicos: Array<Servico> = [ ];

  constructor(private servico: ServicosService) { }

  ngOnInit() {
    this.servicos = this.servico.getServicos();
  }

}
