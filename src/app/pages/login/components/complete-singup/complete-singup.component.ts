import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Buyer from 'src/app/models/buyer';
import Supplier from 'src/app/models/supplier';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { SignUpService } from 'src/app/service/signUp/sign-up.service';

@Component({
  selector: 'app-complete-singup',
  templateUrl: './complete-singup.component.html',
  styleUrls: ['./complete-singup.component.scss']
})
export class CompleteSingupComponent implements OnInit {

  formProfile : FormGroup;
  isSupplier = false;

  get contacts() {
    return this.formProfile.get('contacts') as FormArray;
  }
  get addresses() {
    return this.formProfile.get('addresses') as FormArray;
  }

  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute,
    private signUpService : SignUpService, private notificationService : NotificationService,
    private router : Router){
    let userId = 0;
    this.activatedRoute.params.subscribe({
      next: params => {
        this.isSupplier = params['userType'] == 'fornecedor';
        userId = params['userId']; 
      }
    });
    
    this.formProfile = this.formBuilder.group({
      companyName: '',
      cnpj: '',
      idUser: userId,
      contacts: formBuilder.array([
        formBuilder.group({
          name: '',
          responsibleArea: '',
          details: '',
        })
      ]),
      addresses: formBuilder.array([
        formBuilder.group({
          cep: '',
          number: '',
          complement: '',
        })
      ]),
    });

    if(this.isSupplier)
      this.formProfile.addControl('cnae', this.formBuilder.control('', Validators.required));
  }

  ngOnInit(): void {
    
    
  }

  onSubmit(){
    if(this.isSupplier && this.formProfile.valid)
      this.signUpService.signUpSupplier(this.formProfile.value.idUser, this.formProfile.value as Supplier).subscribe({
        next:  () => {
          this.notificationService.showMessage('Fornecedor foi cadastrado com sucesso!');
          this.formProfile.reset();
          this.router.navigate(['login']);
        },
        error: () => this.notificationService.showMessage('Erro ao cadastrar fornecedor!')
      });

    else if (this.formProfile.valid)
      this.signUpService.signUpBuyer(this.formProfile.value.idUser, this.formProfile.value as Buyer).subscribe({
        next:  () => {
          this.notificationService.showMessage('Comprador foi cadastrado com sucesso!');
          this.formProfile.reset();
          this.router.navigate(['login']);
        },
        error: () => this.notificationService.showMessage('Erro ao cadastrar comprador!')
      });

    else
      this.notificationService.showMessage('Formulário não foi não preenchido');
  }


}
