import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public cliente: Cliente = {
    id: '',
    nome: '',
    cidade: '',
    idade: 0,
    genero: '',
    servicos: [],
    nomeFotoEnviada: '',
    urlFotoCapturada: '',
    urlFotoExibir: ''
  }

  public clientes: Cliente[] = [];
  public clientesAux: Cliente[] = [];


  public servicoCodigo = null;

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
   this.clientesService.getAll().subscribe((clientesList)=>{

    this.clientes = clientesList.map((cliente)=>{
      const auxCliente = {
        id: cliente.payload.doc.id,
        nome: cliente.payload.doc.data()['nome'],
        cidade: cliente.payload.doc.data()['cidade'],
        idade: cliente.payload.doc.data()['idade'],
        genero: cliente.payload.doc.data()['genero'],
        servicos: cliente.payload.doc.data()['servicos'],
        nomeFotoEnviada: cliente.payload.doc.data()['nomeFotoEnviada'],
        urlFotoCapturada: cliente.payload.doc.data()['urlFotoCapturada'],
        urlFotoExibir: cliente.payload.doc.data()['urlFotoExibir']
      };

      return auxCliente;
    });

    this.clientesAux = this.clientes;

   })
  }

  public buscarNome(event) {

    const nome: string = String(event.srcElement.value);

    if (nome) {


      this.clientesService.getByNome(nome).subscribe((clientesList)=>{
        this.clientes = clientesList.map( (cliente)=>{
          const auxCliente = {
            id: cliente.payload.doc.id,
            nome: cliente.payload.doc.data()['nome'],
            cidade: cliente.payload.doc.data()['cidade'],
            idade: cliente.payload.doc.data()['idade'],
            genero: cliente.payload.doc.data()['genero'],
            servicos: cliente.payload.doc.data()['servicos'],
            nomeFotoEnviada: cliente.payload.doc.data()['nomeFotoEnviada'],
            urlFotoCapturada: cliente.payload.doc.data()['urlFotoCapturada'],
            urlFotoExibir: cliente.payload.doc.data()['urlFotoExibir']
          };
          return auxCliente;
        });

      });

    } else  if (!nome) {
        this.clientes = this.clientesAux;
    }

  }


  public buscarNomeOrdem() {
    this.clientesService.getByNomesOrdenados().subscribe((clientesList)=>{
      this.clientes = clientesList.map((cliente)=>{
        const auxCliente = {
          id: cliente.payload.doc.id,
          nome: cliente.payload.doc.data()['nome'],
          cidade: cliente.payload.doc.data()['cidade'],
          idade: cliente.payload.doc.data()['idade'],
          genero: cliente.payload.doc.data()['genero'],
          servicos: cliente.payload.doc.data()['servicos'],
          nomeFotoEnviada: cliente.payload.doc.data()['nomeFotoEnviada'],
          urlFotoCapturada: cliente.payload.doc.data()['urlFotoCapturada'],
          urlFotoExibir: cliente.payload.doc.data()['urlFotoExibir']
        };

        return auxCliente;
      });
    });
  }

  public buscarIdade() {
    this.clientesService.getByIdade(this.cliente.idade).subscribe((clientesList)=>{
      this.clientes = clientesList.map((cliente)=>{
        const auxCliente = {
          id: cliente.payload.doc.id,
          nome: cliente.payload.doc.data()['nome'],
          cidade: cliente.payload.doc.data()['cidade'],
          idade: cliente.payload.doc.data()['idade'],
          genero: cliente.payload.doc.data()['genero'],
          servicos: cliente.payload.doc.data()['servicos'],
          nomeFotoEnviada: cliente.payload.doc.data()['nomeFotoEnviada'],
          urlFotoCapturada: cliente.payload.doc.data()['urlFotoCapturada'],
          urlFotoExibir: cliente.payload.doc.data()['urlFotoExibir']
        };

        return auxCliente;
      })
    });
  }

  public buscarClientesServico() {

    this.clientesService.getByServico(this.servicoCodigo).subscribe((clientesList)=>{
      this.clientes = clientesList.map((cliente)=>{

        const auxCliente = {
          id: cliente.payload.doc.id,
          nome: cliente.payload.doc.data()['nome'],
          cidade: cliente.payload.doc.data()['cidade'],
          idade: cliente.payload.doc.data()['idade'],
          genero: cliente.payload.doc.data()['genero'],
          servicos: cliente.payload.doc.data()['servicos'],
          nomeFotoEnviada: cliente.payload.doc.data()['nomeFotoEnviada'],
          urlFotoCapturada: cliente.payload.doc.data()['urlFotoCapturada'],
          urlFotoExibir: cliente.payload.doc.data()['urlFotoExibir']
        };

        return auxCliente;
      });
    });
  }
}
