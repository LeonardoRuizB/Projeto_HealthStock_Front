import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', component: CatalogueComponent, data: {
    title: "HealthStock - Fornecedor - Catalogue"
  }},
  {path: 'cadastro', component: RegisterComponent, data: {
    title: "HealthStock - Fornecedor - Cadastro"
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
