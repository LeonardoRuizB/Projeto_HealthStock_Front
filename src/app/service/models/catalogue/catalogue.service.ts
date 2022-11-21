import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { environment } from 'src/environments/environment';
import { EventsService } from '../../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private client : HttpClient, private eventsService : EventsService) { }

  getCatalogue(supplierId : number){
    const resultObservable = new Observable<ISupplierCatogue[]>((observer) => {
      this.client.get<ISupplierCatogue[]>(`${environment.productService.host}/suppliercatalog/${supplierId}`)
      .subscribe({
        next:response => {
          this.eventsService.SendEvent(`Catalogo de Forncedor ${supplierId} foram pegas com sucesso!`, response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent(`Erro ao pegar Catalogo de Forncedor ${supplierId}!`, errorResponse, 'error');
          observer.next(errorResponse);
        },
      })
    });
    return resultObservable;
  }

  deleteCatalogue(supplierId : number, supplierCatalogId : number){
    return new Observable<any>((observer) => {
      this.client.delete<any>(`${environment.productService.host}/suppliercatalog/${supplierId}/${supplierCatalogId}`)
      .subscribe({
        next:response => {
          this.eventsService.SendEvent(`Catalogo de Forncedor ${supplierId} foi deletado com sucesso!`, response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent(`Erro ao deletar Catalogo de Forncedor ${supplierId}!`, errorResponse, 'error');
          observer.error(errorResponse);
        },
      })
    });
  }
}
