import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/service/product/product.service';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  formProduto : FormGroup;
  categories : any = []

  constructor(private productService:ProductService, private categoryService:CategoryService) {let formBuilder = new FormBuilder();
    
    this.formProduto = formBuilder.group({
      name: [ '' ],
      description: [ '' ], 
      categoryId: [ '' ]
    }); }

  ngOnInit(): void {
    this.categoryService.getCategories()
    .subscribe({
      next : response => {
        this.categories = response;
      }
    })
  }
onSubmit(){
  this.productService.createProduto(this.formProduto.value);
  this.formProduto.reset();
  console.log(this.formProduto.value)
}
}
