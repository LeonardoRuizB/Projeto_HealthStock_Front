import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SliderComponent } from './components/slider/slider.component';



@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
