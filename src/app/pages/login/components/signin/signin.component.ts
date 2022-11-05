import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  message:string = "";
  formCliente : FormGroup;

  constructor(private authService: AuthService) {
    let formBuilder = new FormBuilder();
    
    this.formCliente = formBuilder.group({
      email: [ '' ],
      password: [ '' ]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let messageLogin = this.authService.doLogin(this.formCliente.value);
  
    messageLogin.subscribe({
      error: responseError => {
        if(responseError.status == 0){
          this.message = "O Serviço de Login não está funcionando corretamente!";
          if(!environment.production)
            this.message += "Você tem que dar um npm start no serviço de Login. Não esquece de clonar o serviço. https://github.com/JoaoGabrielOliveira/healthstock-login";
        }
        else
          this.message = responseError.error.error;
      },
    });
  }


}
