import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client : HttpClient, private eventsService : EventsService) { }

  getCategories(){
    let resout = this.client.get<any[]>("http://localhost:8090/category");
    resout.subscribe({
      next:response => {
        this.eventsService.SendEvent('Categorias pegas com sucesso!', response);
      },
      error:errorResponse => {
        this.eventsService.SendEvent('Erro ao pegar categorias!', errorResponse, 'error');
      },
    })
    return resout;
  };
}
