import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteNovoPageRoutingModule } from './cliente-novo-routing.module';

import { ClienteNovoPage } from './cliente-novo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClienteNovoPageRoutingModule
  ],
  declarations: [ClienteNovoPage]
})
export class ClienteNovoPageModule {}
