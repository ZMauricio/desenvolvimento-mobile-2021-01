import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Servico } from 'src/app/models/servico.model';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servico-novo',
  templateUrl: './servico-novo.page.html',
  styleUrls: ['./servico-novo.page.scss'],
})
export class ServicoNovoPage implements OnInit {

  public servico: Servico = {
    id: null,
    nome: "",
    preco: 0,
    descricao: "",
    imgPath: ""
  };

  constructor(private router: Router,
              private servicoService: ServicoService) {

  }

  ngOnInit() {
  }

  public cadastrar() {
    console.log('servico', this.servico);
    this.servicoService.addServico(this.servico);
    this.router.navigate(['/servicos']);
  }
}
