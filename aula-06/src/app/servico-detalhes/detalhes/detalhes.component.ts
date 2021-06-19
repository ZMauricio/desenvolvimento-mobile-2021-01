import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Servico } from 'src/app/models/servico.model';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent implements OnInit {


  public servico: Servico = {
    id: undefined,
    nome: "",
    valor: undefined,
    descricao: "",
    imgPath: ""
  };

  constructor(private router: Router,
              private rotaAtiva: ActivatedRoute,
              private servicoService: ServicosService) { }

  ngOnInit() {
    let id: string = this.rotaAtiva.snapshot.paramMap.get('id');

    this.servicoService.getServicoById(id).then( (servico)=>{
      this.servico = servico;
    });

  }

  public deletar() {
    this.servicoService.deleteServico(this.servico.id).then((resposta)=>{
      console.log('resposta: ', resposta);
      this.router.navigate(['/servicos']);
    });

  }

  public habilitarEdicao() {
    this.router.navigate([`/servico-detalhes/edicao/${this.servico.id}`])
  }
}
