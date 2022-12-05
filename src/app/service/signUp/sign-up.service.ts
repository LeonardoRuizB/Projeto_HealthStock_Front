import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Buyer from 'src/app/models/buyer';
import Supplier from 'src/app/models/supplier';
import { IUser } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private client:HttpClient, private eventsService : EventsService) {}

  singUpUser(user : IUser){
    return new Observable<IUser>((observer) => {
      this.client.post<IUser>(`${environment.loginService.host}/users`, user).subscribe({
        next: response => {
          this.eventsService.SendEvent("Dados do usuário cadastrados com sucesso!", response);
          observer.next(response);
        },
        error: errorResponse => {
          this.eventsService.SendEvent("Erro ao cadastrar dados do usuário!", errorResponse);
          observer.error(errorResponse);
        }
      })

    })

  }

  signUpSupplier(userId : number, supplier : Supplier){
    let supplierRequest : any = {idUser : userId, ...supplier};

    return new Observable<Supplier>((observer) => {
      this.client.post<Supplier>(`${environment.loginService.host}/cadastro/fornecedor`, supplierRequest)
      .subscribe({
        next:response => {
          this.eventsService.SendEvent('Fornecedor foi salvo com sucesso!', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao salvar fornecedor!', errorResponse, 'error');
          observer.error(errorResponse);
        },
      })
    });
  }

  signUpBuyer(userId : number, buyer : Buyer){
    let buyerRequest : any = {idUser : userId, ...buyer};

    return new Observable<Buyer>((observer) => {
      this.client.post<Buyer>(`${environment.loginService.host}/cadastro/comprador`, buyerRequest)
      .subscribe({
        next:response => {
          this.eventsService.SendEvent('Comprador foi salvo com sucesso!', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao salvar comprador!', errorResponse, 'error');
          observer.error(errorResponse);
        },
      })
    });
  }

  sendEmailMessage(userId : number, userType : string, motivationMessage:string = ""){
    return new Observable<any>((observer) => {
      this.client.post(`${environment.loginService}/sendEmail`,
        {userId: userId, userType: userType, linkToRedirect: `${environment.host}/cadastro/fornecedor`, motivationMessage: motivationMessage})
      .subscribe({
        next: response => {
          observer.next(response);
        },
        error: errorResponse => {
          observer.error(errorResponse);
        }
      });
    });
  }
}
