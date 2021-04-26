import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Servico } from 'src/app/models/servico.model';
import { ServicosService } from '../services/servicos.service';

@Component({
  selector: 'app-servico-novo',
  templateUrl: './servico-novo.page.html',
  styleUrls: ['./servico-novo.page.scss'],
})
export class ServicoNovoPage implements OnInit {

  public servico: Servico = {
    id: null,
    nome: "",
    valor: 0,
    descricao: "",
    imgPath: ""
  };

  constructor(private servicoService: ServicosService, private router: Router) { }

  ngOnInit() {
  }

  public cadastrar() {
    console.log('serviço', this.servico);

    this.servicoService.addServico(this.servico).then((servico)=>{
      console.log('Novo servico: ', servico);

      this.router.navigate(['/servicos']);
    }).catch((erro)=>{
      console.error('Cadastrar erro: ', erro);
    })

  }
}
