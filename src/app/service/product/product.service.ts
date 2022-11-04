import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventsService } from '../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private client : HttpClient, private eventsService : EventsService) { }

  createProduto(body: any){
    let resout = this.client.post(`${environment.productService.host}/product`, body);
    resout.subscribe({
      next:response => {
        this.eventsService.SendEvent('Produto cadastrado com sucesso!', response);
      },
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao cadastrar Produto!', errorResponse);
      },
    });

    return resout
  };

  getProdutos(limit = 3, offset = 0) : Observable<[]> {
    let result = this.client.get<[]>(`${environment.productService.host}/product?limit=${limit}&offset=${offset}`);

    result.subscribe({
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse);
      },
    });

    return result;
  }

  searchProdutos(search:string,limit = 3, offset = 0) : Observable<[]> {
    let result = this.client.get<[]>(`${environment.productService.host}/product?limit=${limit}&offset=${offset}&search=${search}`);

    result.subscribe({
      next: response => {
        this.eventsService.SendEvent('Pesquisa de produto foi realizada com sucesso!', search);
      },
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse, 'error');
      },
    });

    return result;
  }

  getTotalProdutos() {
    let result = this.client.get<{total:number}>(`${environment.productService.host}/product?total`);

    result.subscribe({
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse);
      },
    });

    return result;
  }
}
