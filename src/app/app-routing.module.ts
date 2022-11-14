import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent, data: {
      title: "HealthStock - Pagina Principal"
    }
  },
  {
    path:"login",component:LoginComponent, data: {
      title: "HealthStock - Login"
    }
  },
  {
    path:"produto/cadastro",component:CadastroProdutoComponent, data: {
      title: "HealthStock - Produtos - Cadastro"
    }
  },
  {
    path:"produtos",component:ProductsComponent, data: {
      title: "HealthStock - Produtos"
    }
  },
  {
    path: 'fornecedor',
    loadChildren: () => import('./pages/supplier/supplier.module').then(m => m.SupplierModule)
  },
  {
    path:"marketplace",component:MarketplaceComponent, data: {
      title: "HealthStock - Marketplace"
    }
  },
  {
    path:"perfil",component:ProfileComponent, data: {
      title: "HealthStock - Perfil"
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
