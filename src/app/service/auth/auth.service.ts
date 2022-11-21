import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Buyer from 'src/app/models/buyer';
import Supplier from 'src/app/models/supplier';
import { environment } from 'src/environments/environment';
import { IBaseUser, User } from '../../models/user';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(private client : HttpClient, private router : Router, private eventsService : EventsService) { }

	doLogin(user : User, redirect : string = ''){
		const resultObservable = new Observable((observer) => {
    		let result = this.client.post(`${environment.loginService.host}/login`, user);
			result.subscribe({
				next: response => {
					this.createLoginSession(response);
					this.eventsService.SendEvent('Login foi realizado com sucesso!', response);
					window.location.replace(redirect);
					observer.next(response)
				},
				error: responseError => {
					if(responseError.status == 401)
						console.warn(responseError.error.error);
					this.eventsService.SendEvent('Erro ao realizar um login!', responseError, 'error');
					observer.error(responseError)
				}
			});
		});

    	return resultObservable;
	}

	doLogout() {
		sessionStorage.clear();
		this.router.navigate(['login']);
	}

	createLoginSession(body : any){
		sessionStorage.setItem('userType', body.type);
		sessionStorage.setItem('user', JSON.stringify(body.userType.user));
		delete body.userType.user;
		sessionStorage.setItem('userTypeData', JSON.stringify(body.userType));

		console.log(body);
	}

	isAuth(){
		return sessionStorage.getItem('user') ? true : false;
	}

	needBeAuth(){
	if(!this.isAuth())
		this.router.navigate(['/login']);
	}

	getUserType() : string{
		let userType = sessionStorage.getItem('userType');
		if(!this.isAuth() || !userType)
			throw new Error("That's is not user session");

		return userType;
	}

	needBeSupplier() : void{
		if(!this.isAuth())
			throw new Error("That's is not user session");

		if(this.getUserType() != "supplier")
			this.router.navigate([''])

	}

	needBeBuyer(){
		if(!this.isAuth())
			throw new Error("That's is not user session");

		if(this.getUserType() != "buyer")
			this.router.navigate([''])
	}

  getUser(){
    let jsonData = sessionStorage.getItem('user') ?? '{}'
    return JSON.parse(jsonData);
  }

	getUserData() : IBaseUser{
		let jsonData = sessionStorage.getItem('userTypeData') ?? '{}'
		let type = sessionStorage.getItem('userType');

		if(!jsonData && !type)
			throw new Error("That's is not user session");

		if(type == "buyer")
			return new Buyer(JSON.parse(jsonData));
		else
			return new Supplier(JSON.parse(jsonData));
	}

  updateProfileSupplier(profile: Supplier){
    const resultObservable = new Observable<Supplier>((observer) => {
      this.client.put<Supplier>(`${environment.loginService.host}/cadastro/fornecedor`, profile).subscribe({
        next:response => {
          this.eventsService.SendEvent('Perfil atualizado com Sucesso', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao atualizar perfil', errorResponse, 'error');
          observer.error(errorResponse);
        },
      });
    });

    return resultObservable
  }

  updateProfileBuyer(profile: Buyer){
    const resultObservable = new Observable<Buyer>((observer) => {
      this.client.put<Buyer>(`${environment.loginService.host}/cadastro/comprador`, profile).subscribe({
        next:response => {
          this.eventsService.SendEvent('Perfil atualizado com Sucesso', response);
          observer.next(response);
        },
        error:errorResponse => {
          this.eventsService.SendEvent('Erro ao atualizar perfil', errorResponse, 'error');
          observer.error(errorResponse);
        },
      });
    });

    return resultObservable
  }
}
