import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicoDetalhesPage } from './servico-detalhes.page';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EdicaoComponent } from './edicao/edicao.component';

const routes: Routes = [
  {
    path: '', component: ServicoDetalhesPage,
    children: [
      {
        path: 'detalhe/:id',
        component: DetalhesComponent
      },
      {
        path: 'edicao/:id',
        component: EdicaoComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicoDetalhesPageRoutingModule {}
