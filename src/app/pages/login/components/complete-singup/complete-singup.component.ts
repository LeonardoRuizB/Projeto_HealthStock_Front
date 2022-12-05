import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Buyer from 'src/app/models/buyer';
import Supplier from 'src/app/models/supplier';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { AddressResponse, SearchService } from 'src/app/service/search/search.service';
import { SignUpService } from 'src/app/service/signUp/sign-up.service';

@Component({
  selector: 'app-complete-singup',
  templateUrl: './complete-singup.component.html',
  styleUrls: ['./complete-singup.component.scss']
})
export class CompleteSingupComponent implements OnInit {

  formProfile : FormGroup;
  isSupplier = false;
  cepLoading = false;
  completeAddress : string = '';

  get contacts() {
    return this.formProfile.get('contacts') as FormArray;
  }
  get addresses() {
    return this.formProfile.get('addresses') as FormArray;
  }

  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute,
    private signUpService : SignUpService, private notificationService : NotificationService,
    private router : Router, private search : SearchService){
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
          cep: this.formBuilder.control('', [Validators.maxLength(8), Validators.minLength(8)]),
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

  searchCEP(event : Event){
    this.cepLoading = true;
    const target = event.target as HTMLInputElement;

    this.search.searchCEP(target.value).subscribe({
      next: response => {
        this.completeAddress = this.getCompleteAddress(response);
        this.cepLoading = false;
      },
      
      complete: () => this.cepLoading = false
    })
  }

  getCompleteAddress(address : AddressResponse) {
    return `${address.publicPlace}, ${address.neighborhood} - ${address.city}/${address.state}`
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
