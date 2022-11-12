import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/components/menu/menu.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SliderComponent } from './pages/marketplace/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CadastroProdutoComponent,
    ProductsComponent,
    MarketplaceComponent,
    ProfileComponent,
    SliderComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
