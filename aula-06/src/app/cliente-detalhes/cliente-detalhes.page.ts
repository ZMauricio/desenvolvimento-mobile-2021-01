import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { Cliente } from '../models/cliente.model';

import { ClientesService } from '../services/clientes.service';
import { ActionSheetController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.page.html',
  styleUrls: ['./cliente-detalhes.page.scss'],
})
export class ClienteDetalhesPage implements OnInit {
  public clienteForm: FormGroup;

  public fotoNova: string = null;

  public imagemSelecionada = '';
  private id: string = '';

  public cliente: Cliente = {
    id: '',
    nome: '',
    cidade: '',
    idade: 0,
    genero: '',
    servicos: [],
    nomeFotoEnviada: '',
    urlFotoCapturada: '',
    urlFotoExibir: '',
  };

  constructor(
    private plataforma: Platform,
    private filePath: FilePath,
    private camera: Camera,
    private webview: WebView,
    private file: File,
    private actionSheet: ActionSheetController,
    private rota: Router,
    private formBuilder: FormBuilder,
    private rotaAtiva: ActivatedRoute,
    private clientesService: ClientesService
  ) {

    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      cidade: ['', Validators.required],
      idade: ['0', Validators.compose([
                Validators.required,
                Validators.min(0)
              ])
      ],
      genero: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.id = this.rotaAtiva.snapshot.paramMap.get('id');
    this.clientesService.getById(this.id).then((cliente) => {
      this.cliente = cliente;
      this.imagemSelecionada =  (cliente.urlFotoExibir)? cliente.urlFotoExibir :'assets/img/user.png';;

      this.clienteForm.patchValue({
        nome: this.cliente.nome,
        cidade: this.cliente.cidade,
        idade: this.cliente.idade,
        genero: this.cliente.genero
      });

    });
  }

  deletar() {
    this.clientesService.deletar(this.id, this.cliente.nomeFotoEnviada).then(()=>{
      this.rota.navigate(['/clientes']);
    });
  }

  salvar() {

    const cliente: Cliente = {
      id: this.cliente.id,
      nome: this.clienteForm.value.nome,
      cidade: this.clienteForm.value.cidade,
      idade: this.clienteForm.value.idade,
      genero: this.clienteForm.value.genero,
      servicos: [], // this.clienteForm.value.servicos,
      nomeFotoEnviada: this.cliente.nomeFotoEnviada,
      urlFotoCapturada: this.imagemSelecionada,
      urlFotoExibir: this.cliente.urlFotoExibir
    }


    this.clientesService.update(cliente, this.fotoNova).then((resposta)=>{
      console.log('resposta', resposta);
      this.rota.navigate(['/clientes']);
    }).catch((erro)=>{
      console.error('Salvar cliente erro', erro);
    });


  }


  public async capturarFoto() {
    const action = await this.actionSheet.create({
      header: 'Capturar foto do cliente',
      buttons: [
        {
          text: 'Galeria de imagens',
          handler: ()=>{
            this.obterFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar a câmera',
          handler: ()=>{
            this.obterFoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await action.present();
  }

  public obterFoto(source: PictureSourceType) {
    const options: CameraOptions = {
      quality: 10,
      targetHeight: 200,
      targetWidth: 200,
      sourceType: source,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((caminhoImagem: string)=>{

      if (this.plataforma.is('android') && source === this.camera.PictureSourceType.PHOTOLIBRARY) {

        this.filePath.resolveNativePath(caminhoImagem).then((localizacao)=>{
          const caminhoCorrigido = localizacao.substr(0, localizacao.lastIndexOf('/')+1);
          const nomeUtilizado= caminhoImagem.substr(caminhoImagem.lastIndexOf('/')+1,caminhoImagem.lastIndexOf('?'));

          let caminhoGaleria = caminhoCorrigido+nomeUtilizado;
          caminhoGaleria = this.caminhoImagem(caminhoGaleria);

          this.imagemSelecionada = caminhoGaleria;
          this.fotoNova = caminhoGaleria;

        });

      } else {
          const caminhoCorrigido = caminhoImagem.substr(0, caminhoImagem.lastIndexOf('/')+1);
          const nomeUtilizado = caminhoImagem.substr(caminhoImagem.lastIndexOf('/')+1);

          this.copiarArquivoDiretorioLocal(caminhoCorrigido, nomeUtilizado,
                                          this.criarNomeArquivo());
      }



    });
  }

  public copiarArquivoDiretorioLocal(caminho, nomeAtual, novoNomeArquivo) {
    this.file.copyFile(caminho, nomeAtual, this.file.dataDirectory, novoNomeArquivo)
    .then((sucesso)=>{
        console.log(sucesso);
        const caminhoArquivo = this.file.dataDirectory+novoNomeArquivo;

        const caminhoConvertido = this.caminhoImagem(caminhoArquivo);
        this.imagemSelecionada = caminhoConvertido;
        this.fotoNova = caminhoConvertido;

    }).catch((falha)=>{
        console.error(falha);
    });
  }

  public caminhoImagem(caminho) {
    if (!caminho) {
      return '';
    } else {
       const caminhoConvertido = this.webview.convertFileSrc(caminho);
       return caminhoConvertido;
    }
  }

  public criarNomeArquivo() {
    const dataAtual = new Date();
    const nome = dataAtual.getTime()+'.jpg';
    return nome;
  }
}
