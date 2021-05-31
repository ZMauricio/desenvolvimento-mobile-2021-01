import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';
import { AuthLoginService } from 'src/app/services/auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  constructor(private authLogin: AuthLoginService) { }

  ngOnInit() {
  }

  ionOnViewEnter() {
    this.authLogin.logout().then((resposta)=>{
      console.log('Logout resposta', resposta);

      this.authLogin.setUsuarioAutenticado(false);
    }).catch((erro)=>{
        console.error('Logout erro: ', erro);
    });
  }

  public logar(formulario: any) {
    console.log(formulario);
    console.log(formulario.value);

    this.usuario.email = formulario.value.email;
    this.usuario.senha = formulario.value.senha;
    this.authLogin.realizarLogin(this.usuario);
  }

}
