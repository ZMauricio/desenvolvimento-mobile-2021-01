import { Injectable } from '@angular/core';

import { Servico } from 'src/app/models/servico.model';


/*
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class ServicosService {

  public servicos: Array<Servico> = [
    {
      id: 1,
      nome: "Troca de óleo",
      valor: 100,
      descricao: "troca periódica do óleo do motor",
      imgPath: "./../../assets/img/luke.jpg"
    },
    {
      id: 2,
      nome: "Regulagem dos freios",
      valor: 90,
      descricao: "Serviço de regulagem dos freios para aumentar a segurança do veículo",
      imgPath: "./../../assets/img/luke.jpg"
    },
    {
      id: 3,
      nome: "Retificação do motor",
      valor: 9000,
      descricao: "Troca das peças do motor danificação devido ao uso",
      imgPath: "./../../assets/img/luke.jpg"
    },
    {
      id: 4,
      nome: "Lanternagem",
      valor: 1000,
      descricao: "Pintura e reparo da lataria do veículo",
      imgPath: "./../../assets/img/luke.jpg"
    },
    {
      id: 5,
      nome: "Troca de pneu",
      valor: 400,
      descricao: "Troca de pneu velhor por um novo",
      imgPath: "./../../assets/img/luke.jpg"
    }
  ];

  constructor() { }

  public teste() {
    console.log("Teste serviço");
  }

  public getServicos(): Array<Servico> {
    return this.servicos;
  }


  public getServicoById(id: number): Servico {

    for(let obj of this.servicos) {
      if (obj.id === id) {
        return obj;
      }
    }

  }
}
