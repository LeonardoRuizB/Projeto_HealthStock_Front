import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Supplier from 'src/app/models/supplier';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formProfile: FormGroup;

  constructor(private authservice: AuthService) {
    let user = this.authservice.getUserData() as Supplier
    // user.contacts = [{name: "Leonardo", details: "1194002-8922", responsibleArea: "Vendas"}]

    this.formProfile = new FormBuilder().group({
      companyName: user.companyName,
      cnpj: user.cnpj,
      cnae: user.cnae,
      idUser: user.id,
      // contacts: user.contacts,
      // addresses: user.addresses
    });
    console.info(this.formProfile.value)
  }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.formProfile.value)
  }
}
