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

  getProdutos() : Observable<[]> {
    let result = this.client.get<[]>(`${environment.productService.host}/product`);

    result.subscribe({
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse);
      },
    });

    return result;
  }
}
