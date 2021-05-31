import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'servicos',
    loadChildren: () => import('./servicos/servicos.module').then( m => m.ServicosPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'servico-detalhes',
    loadChildren: () => import('./servico-detalhes/servico-detalhes.module').then( m => m.ServicoDetalhesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'servico-novo',
    loadChildren: () => import('./servico-novo/servico-novo.module').then( m => m.ServicoNovoPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'cliente-novo',
    loadChildren: () => import('./cliente-novo/cliente-novo.module').then( m => m.ClienteNovoPageModule)
    //,
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
