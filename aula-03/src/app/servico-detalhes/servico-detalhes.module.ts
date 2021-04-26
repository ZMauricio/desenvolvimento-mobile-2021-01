import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicoDetalhesPageRoutingModule } from './servico-detalhes-routing.module';

import { ServicoDetalhesPage } from './servico-detalhes.page';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EdicaoComponent } from './edicao/edicao.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicoDetalhesPageRoutingModule
  ],
  declarations: [
    ServicoDetalhesPage,
    DetalhesComponent,
    EdicaoComponent
  ]
})
export class ServicoDetalhesPageModule {}
