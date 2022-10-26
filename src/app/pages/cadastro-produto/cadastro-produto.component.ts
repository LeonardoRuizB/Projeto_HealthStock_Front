import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  formProduto : FormGroup;
  constructor() {let formBuilder = new FormBuilder();
    
    this.formProduto = formBuilder.group({
      Produto: [ '' ],
      Descricao: [ '' ], 
      Categoria: [ '' ]
    }); }

  ngOnInit(): void {
  }
onSubmit(){}
}
