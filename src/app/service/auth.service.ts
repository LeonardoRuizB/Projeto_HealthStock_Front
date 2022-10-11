import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(private client : HttpClient, private router : Router) { }

	doLogin(user : User, redirect : string = '/'){
    	let result = this.client.post(`${environment.loginService.host}/login`, user);

		result.subscribe({
			next: response => {
				this.createLoginSession(response);
				this.router.navigate([redirect]);
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
}
