import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RegisterComponent,
    CatalogueComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
