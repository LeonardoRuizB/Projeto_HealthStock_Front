import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ICartDao from 'src/app/models/dao/cartDao';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { environment } from 'src/environments/environment';
import { EventsService } from '../../events/events.service';


@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private client:HttpClient, private eventsService : EventsService ) { }

  getProdutos(limit = 3, offset = 0) : Observable<[]> {
    const resultObservable = new Observable<[]>((observer) => {
      this.client.get<[]>(`${environment.productService.host}/marketplace?limit=${limit}&offset=${offset}`).subscribe({
        next: response => observer.next(response),
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao carregar marketplace', errorResponse, 'error');
          observer.error(errorResponse);
        }
      });
    })

    return resultObservable;
  }
  
  getProduto(id:number) : Observable<ISupplierCatogue> {
    const resultObservable = new Observable<ISupplierCatogue>((observer) => {
      this.client.get<ISupplierCatogue>(`${environment.productService.host}/marketplace/${id}`).subscribe({
        next: response => observer.next(response),
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao carregar produto do marketplace', errorResponse, 'error');
          observer.error(errorResponse);
        }
      });
    })

    return resultObservable;
  }

  getCart(){
    let cartStorage = sessionStorage.getItem('cart');
    return cartStorage ? JSON.parse(cartStorage) as Array<ICartDao> : new Array<ICartDao>;
  }

  saveCart(cartItens : ICartDao[]){
    let cart = this.getCart();
    cart = cartItens;
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  addCart(...cartItem : ICartDao[]){
    let cart = this.getCart();
    cart.push(...cartItem);
    this.saveCart(cart);
  }
}
