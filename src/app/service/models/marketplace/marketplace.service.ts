import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
