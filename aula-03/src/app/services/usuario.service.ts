import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreModule
} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  public getAll() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  public get(id: string) {
    return this.firestore.collection('usuarios').doc(id).ref.get().then((usuario)=>{
      if(usuario.exists) {
        return {
          id: usuario.id,
          nome: usuario.data()['nome'],
          funcao: usuario.data()['funcao'],
          salario: usuario.data()['salario'],
          email: usuario.data()['email'],
          senha: usuario.data()['senha'],
          foto: usuario.data()['foto']
        }
      } else {
          return {
            id: '',
            nome: '',
            funcao: '',
            salario: 0,
            email: '',
            senha: '',
            foto: ''
          }
      }
    });
  }
}
