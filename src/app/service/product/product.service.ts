import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventsService } from '../events/events.service';
import { IPhoto } from '../../models/photo';
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private client : HttpClient, private eventsService : EventsService) { }

  createProduto(body: any){
    const resultObservable = new Observable<any>((observer) => {
      this.client.post<any>(`${environment.productService.host}/product`, body).subscribe({
        next:response => {
          this.eventsService.SendEvent('Produto cadastrado com sucesso!', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao cadastrar Produto!', errorResponse, 'error');
          observer.error(errorResponse);
        },
      });
    });

    return resultObservable
  };

  getProdutos(limit = 3, offset = 0) : Observable<[]> {
    let result = this.client.get<[]>(`${environment.productService.host}/product?limit=${limit}&offset=${offset}`);

    result.subscribe({
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse, 'error');
      },
    });

    return result;
  }

  searchProdutos(search:string,limit = 3, offset = 0) {
    let searchQuery = `limit=${limit}&offset=${offset}&search=${search}`;
    let result = this.client.get<any>(`${environment.productService.host}/product?${searchQuery}`);

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
        this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse, 'error');
      },
    });

    return result;
  }

  uploadPhoto(id:number, photo:IPhoto){
    const formData = new FormData();

    formData.append("photo", new Blob([Buffer.from(photo.data, 'base64').toString('ascii')], { type: photo.mimeType}), "photo." + photo.mimeType.split('/')[1]);
    let result = this.client.post(`${environment.productService.host}/product/${id}/profile`, formData);

    result.subscribe({
      next: response => {
        this.eventsService.SendEvent("Foto de produto cadastrada com sucesso!", {productId: id});
      },

      error: error => {
        this.eventsService.SendEvent("Erro ao cadastrar foto de produto", error, 'error');
      }
    })

    return result;
  }
}
