import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Servico } from './../models/servico.model';
import { ServicosService } from './../services/servicos.service';

@Component({
  selector: 'app-servico-detalhes',
  templateUrl: './servico-detalhes.page.html',
  styleUrls: ['./servico-detalhes.page.scss'],
})
export class ServicoDetalhesPage implements OnInit {

  constructor() {}

  ngOnInit() {

  }


  /*
  private habilitar: boolean = false;

  public servico: Servico = {
    id: undefined,
    nome: "",
    valor: undefined,
    descricao: "",
    imgPath: ""
  };


  public servicoEdit: Servico = {
    id: undefined,
    nome: "",
    valor: undefined,
    descricao: "",
    imgPath: ""
  };


  constructor(private router: Router,
              private rotaAtiva: ActivatedRoute,
              private servicoService: ServicosService) {

  }

  ngOnInit() {
    let parametro: string = this.rotaAtiva.snapshot.paramMap.get('id');
    let id: number = Number(parametro);

    this.servico = this.servicoService.getServicoById(id);
  }

  public deletar() {
    this.servicoService.deleteServico(this.servico.id);
    this.router.navigate(['/servicos']);
  }

  public editar() {
    console.log("servicoEdit", this.servicoEdit);

    this.servicoService.editarServico(this.servicoEdit);
    this.router.navigate(['/servicos']);
  }

  public habilitarEdicao() {

    this.servicoEdit.id = this.servico.id;
    this.servicoEdit.nome = this.servico.nome;
    this.servicoEdit.valor = this.servico.valor;
    this.servicoEdit.descricao = this.servico.descricao;
    this.servicoEdit.imgPath = this.servico.imgPath;

    this.habilitar = true;
  }

  public cancelarEdicao() {
    this.habilitar = false;
  }
  */
}
