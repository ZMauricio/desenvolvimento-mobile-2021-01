import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
import { AuthLoginService } from '../services/auth-login.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public senhaConfirmacao: string = '';

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

  constructor(private usuarioService: UsuarioService,
              private rota: Router,
              private authLogin: AuthLoginService) { }

  ngOnInit() {
  }

  public registrar() {

    this.authLogin.registrar(this.usuario).then((credenciais)=>{
      console.log('Registrar credenciais', credenciais);

      this.usuario.codigoUID = credenciais.user.uid;

      this.usuarioService.add(this.usuario).then((resposta)=>{
        console.log('resposta', resposta);

        this.rota.navigate(['/login']);
      });


    }).catch((erro)=>{
      console.error('Registrar erro: ', erro);
    });


  }
}
