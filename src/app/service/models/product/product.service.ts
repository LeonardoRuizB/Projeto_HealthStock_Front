import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventsService } from '../../events/events.service';
import { IPhoto } from '../../../models/photo';
import { Buffer } from 'buffer';
import { IProduct } from 'src/app/models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private client : HttpClient, private eventsService : EventsService) { }

  createProduto(body: IProduct){
    const resultObservable = new Observable<IProduct>((observer) => {
      this.client.post<IProduct>(`${environment.productService.host}/product`, body).subscribe({
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
    const resultObservable = new Observable<[]>((observer) => {
      this.client.get<[]>(`${environment.productService.host}/product?limit=${limit}&offset=${offset}`).subscribe({
        next: response => observer.next(response),
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse, 'error');
          observer.error(errorResponse);
        }
      });
    })

    return resultObservable;
  }

  searchProdutos(search:string,limit = 3, offset = 0) {
    let searchQuery = `limit=${limit}&offset=${offset}&search=${search}`;
    const resultObservable = new Observable<any>((observer) => {
      this.client.get<IProduct|number[]>(`${environment.productService.host}/product?${searchQuery}`)
        .subscribe({
          next: response => {
            this.eventsService.SendEvent('Pesquisa de produto foi realizada com sucesso!', search);
            observer.next(response);
          },
          error:errorResponse => {
            this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse, 'error');
            observer.error(errorResponse);
          },
      });
    })

    return resultObservable;
  }

  getTotalProdutos() {
    const resultObservable = new Observable<{total:number}>((observer) => {
      this.client.get<{total:number}>(`${environment.productService.host}/product?total`)
        .subscribe({
          next: response => observer.next(response),
          error:errorResponse => {
            this.eventsService.SendEvent('Erro ao pegar produtos!', errorResponse, 'error');
            observer.error(errorResponse);
        },
      });
    });

    return resultObservable;
  }

  uploadPhoto(id:number, photo:IPhoto){
    const resultObservable = new Observable<IPhoto>((observer) => {
      const formData = new FormData();
      formData.append("photo", new Blob([Buffer.from(photo.data, 'base64').toString('ascii')], { type: photo.mimeType}), "photo." + photo.mimeType.split('/')[1]);

      this.client.post<IPhoto>(`${environment.productService.host}/product/${id}/profile`, formData)
        .subscribe({
          next: response => {
            this.eventsService.SendEvent("Foto de produto cadastrada com sucesso!", {productId: id});
            observer.next(response);
          },
          error: error => {
            this.eventsService.SendEvent("Erro ao cadastrar foto de produto", error, 'error');
            observer.error(error);
          }
        })
    });

    return resultObservable;
  }
}
