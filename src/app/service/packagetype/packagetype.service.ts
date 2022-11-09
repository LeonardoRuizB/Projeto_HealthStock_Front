import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPackageType } from 'src/app/models/packageType';
import { environment } from 'src/environments/environment';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class PackageTypeService {

  constructor(private client : HttpClient, private eventsService : EventsService) { }

  getPackageType(){
    const resultObservable = new Observable<IPackageType[]>((observer) => {
      this.client.get<IPackageType[]>(`${environment.productService.host}/packagetype/`)
      .subscribe({
        next:response => {
          this.eventsService.SendEvent('Tipo de pacote pegas com sucesso!', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao pegar tipo de pacote!', errorResponse, 'error');
          observer.next(errorResponse);
        },
      })
    });
    return resultObservable;
  };
}
