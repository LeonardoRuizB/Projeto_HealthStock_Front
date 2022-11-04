import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
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
