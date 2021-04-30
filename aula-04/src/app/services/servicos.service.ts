import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreModule
} from '@angular/fire/firestore';


import { Servico } from 'src/app/models/servico.model';


/*
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class ServicosService {

  constructor(private firestore: AngularFirestore) { }

  public getServicos() {
    return this.firestore.collection('servicos').snapshotChanges();
  }


  public getServicoById(id: string) {

    return this.firestore.collection('servicos').doc(id).ref.get().then((servico)=>{

      if (servico.exists) {
        // const obj = servico.data();
        return {
          id: servico.id,
          nome: servico.data()['nome'],
          valor: servico.data()['valor'],
          descricao:servico.data()['descricao'],
          imgPath: servico.data()['imgPath']
        }
      } else {
         return {
          id: null,
          nome: '',
          valor: '',
          descricao: '',
          imgPath: ''
         }
      }
    });

  }

  public addServico(item: Servico) {
    item.imgPath = "./../../assets/img/car.png";
    delete item.id;
    return this.firestore.collection('servicos').add(item);
  }

  public deleteServico(id: string) {
    return this.firestore.doc(`servicos/${id}`).delete();
  }

  public editarServico(item: Servico) {
    return this.firestore.doc(`servicos/${item.id}`).update(item);
  }
}
