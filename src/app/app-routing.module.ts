import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { MarketplaceProductComponent } from './pages/marketplace-product/marketplace-product.component';
import { MessageComponent } from './pages/login/components/message/message.component';
import { CompleteSingupComponent } from './pages/login/components/complete-singup/complete-singup.component';

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
    path:"login/precadastro",component:MessageComponent, data: {
      title: "HealthStock - Pre-cadastro"
    }
  },
  {
    path:"login/cadastrar/:userType/:userId",component:CompleteSingupComponent, data: {
      title: "HealthStock - Completar cadastro"
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
    path:"marketplace/:produto",component:MarketplaceProductComponent, data: {
      title: "HealthStock - Marketplace - Produto"
    }
  },
  {
    path:"perfil",component:ProfileComponent, data: {
      title: "HealthStock - Perfil"
    }
  },
  {
    path:"pedidos",component:OrderComponent, data: {
      title: "HealthStock - Pedidos"
    }
  },
  {
    path:"carrinho",component:CartComponent, data: {
      title: "HealthStock - Carrinho"
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
