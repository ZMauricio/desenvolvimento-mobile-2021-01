import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicoNovoPage } from './servico-novo.page';

const routes: Routes = [
  {
    path: '',
    component: ServicoNovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicoNovoPageRoutingModule {}
