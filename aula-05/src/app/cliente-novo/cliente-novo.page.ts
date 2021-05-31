import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.page.html',
  styleUrls: ['./cliente-novo.page.scss'],
})
export class ClienteNovoPage implements OnInit {
  public clienteForm: FormGroup;

  public servicosList: any[] = [
    {
      id: 1,
      name: 'Troca de óleo',
      value: 'troca-oleo',
      checked: false
    },
    {
      id: 2,
      name: 'Pintura',
      value: 'pintura',
      checked: false
    },
    {
      id: 3,
      name: 'Balanceamento',
      value: 'balanceamento',
      checked: false
    }
  ]


  /*
  public cliente: Cliente = {
    id: '',
    nome: '',
    cidade: '',
    idade: 0,
    genero: '',
    servicos: []
  };
*/

  constructor(private clienteServico: ClientesService,
              private rota: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                  ])
      ],
      cidade: ['', Validators.required],
      idade: ['0', Validators.compose([
                    Validators.required,
                    Validators.min(0)
                  ])
             ],
      genero: ['', Validators.required]
    });
  }

  public salvar() {

    /*
    this.clienteServico.add(this.cliente).then((resposta)=>{
      console.log('resposta', resposta);
      this.rota.navigate(['/clientes']);
    }).catch((erro)=>{
      console.error('Salvar cliente erro', erro);
    });
    */

  }
}
