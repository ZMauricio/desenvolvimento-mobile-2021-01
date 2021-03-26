import { Component, OnInit } from '@angular/core';

import { ServicoService } from 'src/app/services/servico.service';
import { Servico } from '../models/servico.model';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  public listaServicos: Array<Servico> = [ ];

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.listaServicos = this.servicoService.getAllServicos();
  }

}
