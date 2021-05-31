import { Injectable } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Cliente } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private firestore: AngularFirestore) { }

  public getAll() {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  public add(cliente: Cliente) {
    delete cliente.id;
    return this.firestore.collection('clientes').add(cliente);
  }

  public getByNome(nome: string) {
    return this.firestore.collection('clientes', ref=> ref.where('nome', '==', nome)).snapshotChanges();
  }

  public getByNomesOrdenados() {
    return this.firestore.collection('clientes', ref=> ref.orderBy('nome', 'asc')).snapshotChanges();
  }

  public getByIdade(idade: number) {
    return this.firestore.collection('clientes', ref=> ref.where('idade', '>=', idade)).snapshotChanges();
  }

  public getByServico(id: number) {
    return this.firestore.collection('clientes',
      ref=> ref.where('servicos', 'array-contains', id)
    ).snapshotChanges();
  }
}
