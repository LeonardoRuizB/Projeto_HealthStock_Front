import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Buyer from 'src/app/models/buyer';
import Supplier from 'src/app/models/supplier';
import { environment } from 'src/environments/environment';
import { IBaseUser, User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(private client : HttpClient, private router : Router) { }

	doLogin(user : User, redirect : string = ''){
    	let result = this.client.post(`${environment.loginService.host}/login`, user);

		result.subscribe({
			next: response => {
				this.createLoginSession(response);
				window.location.replace(redirect);
			},
			error: responseError => {
				if(responseError.status == 401)
					console.warn(responseError.error.error);
			}
		});

    	return result;
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
}
