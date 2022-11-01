import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private client: HttpClient) {}

  SendEvent(message:string, data:any, level:string = 'info'){
    this.client.post(environment.eventsService.host, {
      "origin":'login',
      "host":environment.host,
      "message":message,
      "level":level,
      "data": data
  }).subscribe({
    error: errorResponse => {
      console.log("Serviço de eventos está fora do ar!", errorResponse);
    }
  })
  }

}
