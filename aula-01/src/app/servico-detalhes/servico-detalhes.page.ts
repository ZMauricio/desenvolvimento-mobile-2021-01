import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Servico } from './../models/servico.model';
import { ServicosService } from './../services/servicos.service';

@Component({
  selector: 'app-servico-detalhes',
  templateUrl: './servico-detalhes.page.html',
  styleUrls: ['./servico-detalhes.page.scss'],
})
export class ServicoDetalhesPage implements OnInit {

  public servico: Servico = {
    id: undefined,
    nome: "",
    valor: undefined,
    descricao: "",
    imgPath: ""
  };

  public servicos: Array<Servico> = [ ];



  constructor(private rotaAtiva: ActivatedRoute, private servicoTeste: ServicosService) {

  }

  ngOnInit() {
    let parametro: string = this.rotaAtiva.snapshot.paramMap.get('id');
    let id: number = Number(parametro);

    // this.definirServico(id);

    this.servico = this.servicoTeste.getServicoById(id);
  }

}
