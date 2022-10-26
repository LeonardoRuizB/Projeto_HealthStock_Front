import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },

  {
    path:"cadastro",component:CadastroComponent
  },
  {
    path:"cadastro/produto",component:CadastroProdutoComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
