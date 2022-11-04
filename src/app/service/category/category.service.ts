import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client : HttpClient, private router : Router) { }

  getCategories(){
    let resout = this.client.get("http://localhost:8090/category");
    resout.subscribe({
      next:response => {
        console.log(response)
      },
      error:errorResponse => {
        alert("Category não cadastrada")
        console.log(errorResponse)
      },
    })
    return resout;
  };
}
