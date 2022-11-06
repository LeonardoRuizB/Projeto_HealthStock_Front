import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formCliente : FormGroup;
  message : string | undefined;
  checkbox:Boolean = true;
  constructor(private authService : AuthService) {
    let formBuilder = new FormBuilder();
    
    this.formCliente = formBuilder.group({
      email: [ '' ],
      password: [ '' ]
    });
  }
  ngOnInit(): void {
    if(this.authService.isAuth())
      window.location.replace('');
  }

  checkboxL(){
    this.checkbox=!this.checkbox;
 }

  clearMessage(): void {
    this.message = '';
  }

}
