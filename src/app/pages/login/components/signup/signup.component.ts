import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { SignUpService } from 'src/app/service/signUp/sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  message:string = "";
  formCliente : FormGroup;

  constructor(private signUpService : SignUpService, private notification : NotificationService,
    private router : Router) {
    let formBuilder = new FormBuilder();
    
    this.formCliente = formBuilder.group({
      email: [ '' ],
      password: [ '' ],
      userType: [ '' ],
      motivation: [ '' ]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.signUpService.singUpUser(this.formCliente.value as IUser).subscribe({
      next: response => {
        this.signUpService.sendEmailMessage(this.formCliente.value.userType, this.formCliente.value.motivation);
        this.notification.showMessage("Pré cadastro foi realizado co sucesso!");
        this.router.navigate(['login/precadastro'])

      },
      error: errorResponse => {
        this.notification.showMessage("Erro ao pré cadastrar dados do usuário!");
      }
    })

  }

}
