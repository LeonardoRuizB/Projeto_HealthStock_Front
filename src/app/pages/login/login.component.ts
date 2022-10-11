import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formCliente : FormGroup;
  message : string | undefined;

  constructor(private authService : AuthService) {
    let formBuilder = new FormBuilder(), user = new User('', '');
    
    this.formCliente = formBuilder.group({
      email: [ user.email ],
      password: [ user.password ]
    });
  }

  ngOnInit(): void {
    //this.onSubmit();
  }
  
  onSubmit(): void {
    let messageLogin = this.authService.doLogin(this.formCliente.value);
  
    messageLogin.subscribe({
      error: responseError => { 
        this.message = responseError.error.error;
      },
    });
  }

}
