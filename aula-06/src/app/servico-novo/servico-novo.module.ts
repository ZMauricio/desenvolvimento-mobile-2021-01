import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicoNovoPageRoutingModule } from './servico-novo-routing.module';

import { ServicoNovoPage } from './servico-novo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicoNovoPageRoutingModule
  ],
  declarations: [ServicoNovoPage]
})
export class ServicoNovoPageModule {}
