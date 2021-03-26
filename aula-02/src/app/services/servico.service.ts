import { Injectable } from '@angular/core';

import { Servico } from 'src/app/models/servico.model';

/*
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class ServicoService {


  public servicos: Array<Servico> = [
    {
      id: 1,
      nome: "Troca de óleo",
      preco: 100,
      descricao: "trocar óleo do motor",
      imgPath: "./../../assets/imagem/car.png"
    },
    {
      id: 2,
      nome: "regulagem de freios",
      preco: 90,
      descricao: "serviço de manutenção dos freios que é feito periódicamente",
      imgPath: "./../../assets/imagem/car.png"
    },
    {
      id: 3,
      nome: "troca de pneus",
      preco: 200,
      descricao: "troca de pneus gastos por novos",
      imgPath: "./../../assets/imagem/car.png"
    },
    {
      id: 4,
      nome: "recondicionamento do motor",
      preco: 7000,
      descricao: "substituição das parte internas do motor",
      imgPath: "./../../assets/imagem/car.png"
    },
    {
      id: 5,
      nome: "Troca da embreagem",
      preco: 300,
      descricao: "Manutenção da embreagem gasta",
      imgPath: "./../../assets/imagem/car.png"
    },
    {
      id: 6,
      nome: "Configurar injeção eletrônica",
      preco: 200,
      descricao: "Configuração via software do dispositivo responsável pela injeção eletrônica do motor",
      imgPath: "./../../assets/imagem/car.png"
    }
  ];

  constructor() { }

  public getAllServicos():Array<Servico> {
    return this.servicos;
  }

  public getServicoById(id: number): Servico {
    for(let obj of this.servicos) {
      if (obj.id === id) {
        return obj;
      }
    }
  }

  public addServico(item: Servico) {
    const id: number = this.servicos.length+1;
    item.id = id;
    item.imgPath = "./../../assets/imagem/car.png";
    this.servicos.push(item);
  }

  public deleteServico(id: number) {
    let pos = null;

    for(let i=0; i<this.servicos.length; i++) {
      if (id === this.servicos[i].id) {
        pos = i;
        break;
      }
    }

    if (pos || (pos===0)) {
      this.servicos.splice(pos, 1);
    }
  }

  public editarServico(item: Servico) {
    console.log('item', item);

    for (let obj of this.servicos) {
      if (item.id === obj.id) {

        obj.nome = item.nome;
        obj.preco = item.preco;
        obj.descricao = item.descricao;
        obj.imgPath = item.imgPath;

        console.log('obj', obj);

        break;
      }
    }

    console.log('servicos', this.servicos);
  }
}
