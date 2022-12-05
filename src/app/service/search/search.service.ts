import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from '../events/events.service';
import { ViacepSearcher } from './cep/ViacepSearcher';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searcher: CEPSearcher

  constructor(private client: HttpClient, private events: EventsService) {
    this.searcher = new ViacepSearcher(client, events);
  }

  searchCEP(cep: string): Observable<AddressResponse> {
    return this.searcher.search(cep);
  }
}

export interface CEPSearcher {
  search(cep: string): Observable<AddressResponse>;
}

export interface AddressResponse {
  publicPlace: string,
  neighborhood: string,
  city: string,
  state: string
}