import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private usuarioAutenticado: boolean = false;

  public usuario: Usuario = {
    id: '',
    nome: '',
    codigoUID: '',
    funcao: '',
    salario: 0,
    email: '',
    senha: '',
    foto: '',
    cep: '',
    rua: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: ''
  };


  constructor(private rota: Router,
              private fireAuth: AngularFireAuth,
              private usuarioService: UsuarioService) { }

  public realizarLogin(usuario: Usuario) {

    console.log('usuario', usuario);

    this.fireAuth.signInWithEmailAndPassword(usuario.email, usuario.senha)
    .then((credenciais)=>{

      console.log('Login crendenciais: ', credenciais);


      this.usuarioService.getByUID(credenciais.user.uid).subscribe((usuario)=>{
        console.log('usuario', usuario);

        let [user] = usuario;

        this.usuario = {
          id: user.payload.doc.id,
          nome: user.payload.doc.data()['nome'],
          codigoUID: user.payload.doc.data()['codigoUID'],
          funcao: user.payload.doc.data()['funcao'],
          salario: user.payload.doc.data()['salario'],
          email: user.payload.doc.data()['email'],
          senha: user.payload.doc.data()['senha'],
          foto: user.payload.doc.data()['foto'],
          cep: user.payload.doc.data()['cep'],
          rua: user.payload.doc.data()['rua'],
          numero: user.payload.doc.data()['numero'],
          bairro: user.payload.doc.data()['bairro'],
          cidade: user.payload.doc.data()['cidade'],
          estado: user.payload.doc.data()['estado'],
        };

        console.log('Recuperado usuario', this.usuario);


      });



      this.usuarioAutenticado = true;

      this.rota.navigate(['/home']);

    }).catch((erro)=>{
      this.usuarioAutenticado = false;

      console.error('Logar erro: ', erro);
    });

  }

  public logout() {
    return this.fireAuth.signOut();
  }

  public registrar(usuario: Usuario) {
    return this.fireAuth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public isUsuarioAutenticado() {
    return this.usuarioAutenticado;
  }

  public setUsuarioAutenticado(valor: boolean) {
    this.usuarioAutenticado = valor;
  }
}
