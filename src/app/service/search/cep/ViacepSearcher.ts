import { HttpClient } from '@angular/common/http';
import { AddressResponse, CEPSearcher } from '../search.service';
import { EventsService } from '../../events/events.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepSearcher implements CEPSearcher {

    constructor(private client: HttpClient, private events: EventsService) { }
  
    search(cep: string): Observable<AddressResponse> {
      const linkToSearchCEP = `https://viacep.com.br/ws/${cep}/json/`;
      return new Observable<AddressResponse>(obsever => {
        this.client.get<any>(linkToSearchCEP).subscribe({
          next: response => {
            if (response.erro) {
              this.events.SendEvent("CEP não é valido!", cep,);
              obsever.error(response);
            } else {
              response = this.mapperViaCEPToAddressResponse(response);
              this.events.SendEvent("CEP foi buscado com sucesso!", { response: response, link: linkToSearchCEP });
  
              obsever.next(response);
            }
          },
          error: error => {
            this.events.SendEvent("Erro ao buscar CEP", { error: error, link: linkToSearchCEP }, 'error');
            obsever.error(error);
          }
        })
      })
    }
  
    mapperViaCEPToAddressResponse(data: any) : AddressResponse {
      return {
        publicPlace: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    }
  }
  