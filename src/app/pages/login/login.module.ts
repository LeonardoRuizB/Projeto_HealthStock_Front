import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './login.component';
import { MessageComponent } from './components/message/message.component';
import { CompleteSingupComponent } from './components/complete-singup/complete-singup.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    LoginComponent,
    MessageComponent,
    CompleteSingupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
