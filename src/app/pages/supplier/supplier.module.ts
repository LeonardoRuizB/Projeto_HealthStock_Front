import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    CatalogueComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SupplierRoutingModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }
