import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    foto: '',
    cep: '',
    rua: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: ''
  };

  constructor(private usuarioService: UsuarioService,
              private rota: Router,
              private authLogin: AuthLoginService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  public obterEndereco(cepParam: any, formulario: any) {
    console.log(cepParam.value);

    let cep: string = String(cepParam.value);

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != "") {

     //Expressão regular para validar o CEP.
     const validacep = /^[0-9]{8}$/;

     if (validacep.test(cep)) {

      this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe((dados)=>{
        console.log(dados);

        if (dados) {
          this.preencherFormulario(dados, formulario);
        } else {
          this.limparCampos(formulario);
        }

      });


     } else {
        this.limparCampos(formulario);
     }

    } else {
      this.limparCampos(formulario);
    }

  }

  public preencherFormulario(dados: any, formulario: any) {
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      funcao: formulario.value.funcao,
      senha: formulario.value.senha,
      senhaTeste: formulario.value.senhaTeste,
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        numero: formulario.value.endereco.numero,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  public limparCampos(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  public registrar(formulario: any) {
    console.log(formulario);
    console.log(formulario.value);
    console.log(formulario.value.endereco);


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
