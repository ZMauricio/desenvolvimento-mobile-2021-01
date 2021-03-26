import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Servico } from './../models/servico.model';
import { ServicoService } from 'src/app/services/servico.service';


@Component({
  selector: 'app-servico-detalhes',
  templateUrl: './servico-detalhes.page.html',
  styleUrls: ['./servico-detalhes.page.scss'],
})
export class ServicoDetalhesPage implements OnInit {
  private edicao: boolean = false;

  public codigo: string = "";

  public servico: Servico =  {
    id: null,
    nome: "",
    preco: null,
    descricao: "",
    imgPath: ""
  };

  public servicoEdit: Servico = {
    id: null,
    nome: "",
    preco: null,
    descricao: "",
    imgPath: ""
  };

  constructor(private router: Router,
              private rotaAtiva: ActivatedRoute,
              private servicoService: ServicoService) {
  }

  ngOnInit() {
    let id: number = 1;

    this.codigo = this.rotaAtiva.snapshot.paramMap.get('id');
    console.log("codigo", this.codigo);

    id = Number(this.codigo);

    this.servico = this.servicoService.getServicoById(id);
  }

  public deletar() {
    this.servicoService.deleteServico(this.servico.id);
    this.router.navigate(['/servicos']);
  }

  public habilitarEdicao() {

    this.servicoEdit.id = this.servico.id;
    this.servicoEdit.nome = this.servico.nome;
    this.servicoEdit.preco = this.servico.preco;
    this.servicoEdit.descricao = this.servico.descricao;
    this.servicoEdit.imgPath = this.servico.imgPath;

    this.edicao = true;
  }

  public cancelarEdicao() {
    this.edicao = false;
  }

  public salvar() {
    console.log('serviço Edit', this.servicoEdit)
    this.servicoService.editarServico(this.servicoEdit);
    this.router.navigate(['/servicos']);
  }

}
