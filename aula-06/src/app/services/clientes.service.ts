import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Cliente } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  constructor(private file: File, private firestore: AngularFirestore) {}

  public getAll() {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  public async add(cliente: Cliente) {
    try {
      delete cliente.id;
      const foto = cliente.urlFotoCapturada.replace('http://localhost/', 'file://');
      cliente.nomeFotoEnviada = this.criarNomeArquivo();

      const blobImagem = await this.criarBlobArquivoImagem(foto);
      const urlFoto = await this.upload(blobImagem, cliente.nomeFotoEnviada);
      cliente.urlFotoExibir = urlFoto;
      await this.deletarArquivoImagem(foto);

      console.log(cliente);

      await this.firestore.collection('clientes').add(cliente);
    } catch (error) {
      console.log(error);
    }
  }

  public async update(cliente: Cliente, fotoNova: string) {
    try {
      if (fotoNova) {
        const foto = fotoNova.replace('http://localhost/', 'file://');
        const blobImagem = await this.criarBlobArquivoImagem(foto);

        const fotoAntiga: string = cliente.nomeFotoEnviada;
        await this.deletarFoto(fotoAntiga);

        cliente.nomeFotoEnviada = this.criarNomeArquivo();
        cliente.urlFotoExibir = await this.upload(blobImagem, cliente.nomeFotoEnviada);
      }

      return this.firestore.doc(`clientes/${cliente.id}`).update(cliente);
    } catch (error) {
        console.log(error);
    }
  }

  public async deletar(id: string, nomeImagem: string) {
    await this.firestore.doc(`clientes/${id}`).delete();
    await this.deletarFoto(nomeImagem);
  }

  public getById(id: string) {
    return this.firestore
      .collection('clientes')
      .doc(id)
      .ref.get()
      .then((cliente) => {
        if (cliente.exists) {
          return {
            id: cliente.id,
            nome: cliente.data()['nome'],
            cidade: cliente.data()['cidade'],
            idade: cliente.data()['idade'],
            genero: cliente.data()['genero'],
            servicos: cliente.data()['servicos'],
            nomeFotoEnviada: cliente.data()['nomeFotoEnviada'],
            urlFotoCapturada: cliente.data()['urlFotoCapturada'],
            urlFotoExibir: cliente.data()['urlFotoExibir'],
          };
        } else {
          return {
            id: '',
            nome: '',
            cidade: '',
            idade: '',
            genero: '',
            servicos: '',
            nomeFotoEnviada: '',
            urlFotoCapturada: '',
            urlFotoExibir: '',
          };
        }
      });
  }

  public async deletarFoto(nomeImagem) {
    try {
      const foto = 'fotosImagens/' + nomeImagem;

      await firebase.default.storage().ref().child(foto).delete();
    } catch (error) {
      console.log(error);
    }
  }

  // deleta a foto do dispositivo
  public async deletarArquivoImagem(caminhoArquivo: string) {
    const caminho = caminhoArquivo.substr(0, caminhoArquivo.lastIndexOf('/') + 1);
    const nomeArquivo = caminhoArquivo.substr(
      caminhoArquivo.lastIndexOf('/') + 1,
      caminhoArquivo.length - caminho.length
    );

    try {
      await this.file.removeFile(this.file.dataDirectory, nomeArquivo);
    } catch (e) {
      console.error(e);
    }
  }

  public getByNome(nome: string) {
    return this.firestore
      .collection('clientes', (ref) => ref.where('nome', '==', nome))
      .snapshotChanges();
  }

  public getByNomesOrdenados() {
    return this.firestore
      .collection('clientes', (ref) => ref.orderBy('nome', 'asc'))
      .snapshotChanges();
  }

  public getByIdade(idade: number) {
    return this.firestore
      .collection('clientes', (ref) => ref.where('idade', '>=', idade))
      .snapshotChanges();
  }

  public getByServico(id: number) {
    return this.firestore
      .collection('clientes', (ref) =>
        ref.where('servicos', 'array-contains', id)
      )
      .snapshotChanges();
  }

  public criarBlobArquivoImagem(caminhoImagem) {
    return new Promise((resolve, reject) => {
      this.file
        .resolveLocalFilesystemUrl(caminhoImagem)
        .then((dadosArquivo) => {
          const { name, nativeURL } = dadosArquivo;

          const path = nativeURL.substr(0, nativeURL.lastIndexOf('/'));
          return this.file.readAsArrayBuffer(path, name);
        })
        .then((buffer) => {
          const blobImagem = new Blob([buffer], {
            type: 'image/jpeg',
          });

          resolve(blobImagem);
        })
        .catch((erro) => {
          console.error(erro);
        });
    });
  }

  public async upload(imagem, nome) {
    if (imagem) {
      try {
        const nomeImagem = 'fotosImagens/' + nome;

        const resultado = await firebase.default
          .storage()
          .ref()
          .child(nomeImagem)
          .put(imagem);
        const urlUpload = resultado.ref.getDownloadURL();
        return urlUpload;
      } catch (error) {
        console.error(error);
      }
    }
  }

  public criarNomeArquivo() {
    const dataAtual = new Date();
    const nome = dataAtual.getTime() + '.jpg';
    return nome;
  }
}
