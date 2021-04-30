import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'src/app/models/servico.model';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
})
export class EdicaoComponent implements OnInit {

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

    this.servicoService.getServicoById(id).then((servico)=>{
      this.servico = servico;
    }).catch((erro)=>{
      console.error('Get by id erro: ', erro);
    })
  }

  cancelar() {
    this.router.navigate(['/servico-detalhes/detalhe/'+this.servico.id]);
  }


  public editar() {
    console.log("servicoEdit", this.servico);

    this.servicoService.editarServico(this.servico).then((resposta)=>{
      console.log('Editar servico: ', resposta);

      this.router.navigate(['/servicos']);
    }).catch((erro)=>{
      console.error('Editar erro: ', erro);
    })

  }
}
