import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/models/photo';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { environment } from 'src/environments/environment';
import { EventsService } from '../../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierCatalogService {

  constructor(private client : HttpClient, private eventsService : EventsService) {}

  createProduct(product : ISupplierCatogue) {
    console.log(product);
    return new Observable<ISupplierCatogue>((observer) => {
      if(!product.name)
        observer.error(new Error("Nome não está preenchido!"));

      if(!product.packageTypeId)
        observer.error(new Error("Tipo de embalagem não está preenchido!"));
        
      this.client.post<ISupplierCatogue>(`${environment.productService.host}/suppliercatalog`, product)
        .subscribe({
          next: response => {
            this.eventsService.SendEvent("Produto adicionado ao meus produtos com sucesso!", response);
            observer.next(response);
          },
          error: error => {
            this.eventsService.SendEvent("Erro ao adicionar produto ao meus produtos", error, 'error');
            observer.error(error);
          }
        })
      });
  }

  uploadPhotos(id:number, photos : IPhoto[]){
    const formData = new FormData();

    formData.append('length', photos.length.toString());

    photos.forEach((photo, index) => {
      formData.append("photo" + index, photo.data,
        "photo." + photo.mimeType.split('/')[1]);
    })

    return new Observable<IPhoto>((observer) => {
    this.client.post<IPhoto>(`${environment.productService.host}/suppliercatalog/${id}/photos`, formData)
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

  }

  
}
