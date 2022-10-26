import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  auth : boolean = false;
  userCompanyName : string = '';

  constructor(private authService: AuthService) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfLogin();
  }

  ngOnInit(): void {
    this.addMobileMenu();
    this.checkIfLogin();
  }
  
  addMobileMenu(){
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        
        const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
        $target?.classList.toggle('is-active');
      });
    });
  }

  checkIfLogin(){
    this.auth = this.authService.isAuth();
    this.userCompanyName = this.authService.getUserData().companyName;
  }

  onLogout() : void {
    this.authService.doLogout();
    this.checkIfLogin();
  }

}
