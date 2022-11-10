import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category';
import { environment } from 'src/environments/environment';
import { EventsService } from '../../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client : HttpClient, private eventsService : EventsService) { }

  getCategories(){
    const resultObservable = new Observable<ICategory[]>((observer) => {
      this.client.get<ICategory[]>(`${environment.productService.host}/category`)
      .subscribe({
        next:response => {
          this.eventsService.SendEvent('Categorias pegas com sucesso!', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao pegar categorias!', errorResponse, 'error');
          observer.next(errorResponse);
        },
      })
    });
    return resultObservable;
  };
}
