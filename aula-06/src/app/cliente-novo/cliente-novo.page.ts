import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { AlertController } from '@ionic/angular';



import { ActionSheetController, Platform } from '@ionic/angular';

import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.page.html',
  styleUrls: ['./cliente-novo.page.scss'],
})
export class ClienteNovoPage implements OnInit {
  public clienteForm: FormGroup;

  private imagemSelecionada: string;


  /*
  public cliente: Cliente = {
    id: '',
    nome: '',
    cidade: '',
    idade: 0,
    genero: '',
    servicos: []
  };
*/

  constructor(private alertControl: AlertController,
              private plataforma: Platform,
              private filePath: FilePath,
              private camera: Camera,
              private webview: WebView,
              private file: File,
              private actionSheet: ActionSheetController,
              private clienteServico: ClientesService,
              private rota: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.imagemSelecionada = 'assets/img/user.png';

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

  public async mensagem(msg: string) {
    const alert = await this.alertControl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  public async salvar() {
    const cliente: Cliente = {
      id: '',
      nome: this.clienteForm.value.nome,
      cidade: this.clienteForm.value.cidade,
      idade: this.clienteForm.value.idade,
      genero: this.clienteForm.value.genero,
      servicos: [], // this.clienteForm.value.servicos,
      nomeFotoEnviada: '',
      urlFotoCapturada: this.imagemSelecionada,
      urlFotoExibir: ''
    }


    this.clienteServico.add(cliente).then((resposta)=>{
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

          this.mensagem(caminhoGaleria);
          this.imagemSelecionada = caminhoGaleria;


          // this.copiarArquivoDiretorioLocal(caminhoCorrigido, nomeUtilizado, this.criarNomeArquivo());


        });

      } else {
          //'/user/galery/foto.jpg'
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

        this.mensagem(caminhoConvertido);

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
