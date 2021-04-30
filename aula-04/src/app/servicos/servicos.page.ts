import { Component, OnInit } from '@angular/core';

import { ServicosService } from 'src/app/services/servicos.service';
import { Servico } from 'src/app/models/servico.model';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  public servicos: Array<Servico> = [ ];

  constructor(private servico: ServicosService) { }

  ngOnInit() {

    this.servico.getServicos().subscribe((servicos)=>{
      console.log('Resposta servicos', servicos);

      /*
      for (const obj of servicos) {
        let aux = {
          id: obj.payload.doc.id,
          nome: obj.payload.doc.data()['nome'],
          valor: obj.payload.doc.data()['valor'],
          descricao: obj.payload.doc.data()['descricao'],
          imgPath: obj.payload.doc.data()['imgPath']
        };

       this.servicos.push(aux);
      }
      */

      this.servicos = servicos.map( (obj)=>{
        return {
          id: obj.payload.doc.id,
          nome: obj.payload.doc.data()['nome'],
          valor: obj.payload.doc.data()['valor'],
          descricao: obj.payload.doc.data()['descricao'],
          imgPath: obj.payload.doc.data()['imgPath']
        }
      });

  }, (erro)=>{
    console.error('Get all erro: ', erro);
  });


  }

}
