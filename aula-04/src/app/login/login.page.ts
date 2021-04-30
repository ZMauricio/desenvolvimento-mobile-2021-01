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
    foto: ''
  };

  constructor(private authLogin: AuthLoginService) { }

  ngOnInit() {
  }

  public logar() {
    this.authLogin.realizarLogin(this.usuario);
  }

}
