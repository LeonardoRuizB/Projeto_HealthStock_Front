import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Buyer from 'src/app/models/buyer';
import Supplier from 'src/app/models/supplier';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formProfile: FormGroup;

  constructor(private authservice: AuthService, private notificationService: NotificationService) {
    let user = this.authservice.getUserData();
    const formBuilder =  new FormBuilder();

    this.formProfile = formBuilder.group({
      email: this.authservice.getUser().email,
      companyName: user.companyName,
      cnpj: user.cnpj,
      idUser: user.id,
      contacts: formBuilder.array([
        formBuilder.group({
          name: user.contacts[0].name,
          responsibleArea: user.contacts[0].responsibleArea,
          details: user.contacts[0].details,
        })
      ]),
      addresses: formBuilder.array([]),
    });

    if(this.isSupplier()){
      this.formProfile.addControl('cnae', new Supplier(user).cnae);
    }

    user.addresses?.forEach( address => {
      this.addresses.push(
        formBuilder.group({
          cep: address.cep,
          number: address.number,
          complement: address.complement,
        })
      )
    })
  }

  get contacts() {
    return this.formProfile.get('contacts') as FormArray;
  }
  get addresses() {
    return this.formProfile.get('addresses') as FormArray;
  }


  ngOnInit(): void {
  }
  onSubmit(){
    if(this.authservice.getUserType() == 'supplier')
      this.authservice.updateProfileSupplier(this.formProfile.value).subscribe({
        next: response => {
          this.notificationService.showMessage("Perfil atualizado com sucesso");
        },
        error: errorResponse => {
          this.notificationService.showMessage("Erro ao atualizar perfil");
        }
      });
    else if(this.authservice.getUserType() == 'buyer')
      this.authservice.updateProfileBuyer(this.formProfile.value).subscribe({
        next: response => {
          this.notificationService.showMessage("Perfil atualizado com sucesso");
        },
        error: errorResponse => {
          this.notificationService.showMessage("Erro ao atualizar perfil");
        }
      });
  }

  isSupplier(){
    return this.authservice.getUserType() == "supplier";
  }
}
