import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';


@NgModule({
  declarations: [
    RegisterComponent,
    CatalogueComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
