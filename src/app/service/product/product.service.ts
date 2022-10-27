import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private client : HttpClient, private router : Router) { }

  createProduto(body: any){
    let resout = this.client.post("http://localhost:8090/product", body);
    resout.subscribe({
      next:response => {
        alert("Produto cadastrado com sucesso!")
        console.log(response)
      },
      error:errorResponse => {
        alert("Erro no cadastro do produto")
        console.log(errorResponse)
      },
    })
  };
}
