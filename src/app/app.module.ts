import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/components/menu/menu.component';

import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    HomeModule,
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
