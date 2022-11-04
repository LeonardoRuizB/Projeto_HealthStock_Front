import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  message:string = "";
  formCliente : FormGroup;

  constructor() {
    let formBuilder = new FormBuilder();
    
    this.formCliente = formBuilder.group({
      email: [ '' ],
      password: [ '' ]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
