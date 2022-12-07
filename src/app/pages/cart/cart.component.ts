import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import ICartDao from 'src/app/models/dao/cartDao';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MarketplaceService } from 'src/app/service/models/marketplace/marketplace.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartList : ICartDao[] = [];
  totalPrice : number = 0;

  constructor(private marketplaceService : MarketplaceService, private authService : AuthService) {
    this.cartList = marketplaceService.getCart();
    this.updateTotalPrice();
  }
  ngOnInit(): void {
    this.authService.needBeAuth();
    this.authService.needBeBuyer();
  }

  ngOnDestroy(): void {
    this.marketplaceService.saveCart(this.cartList);
  }

  removeItem(index : number){
    this.cartList.splice(index, 1);
    this.updateTotalPrice();
  }

  decreaseQuantity(index : number){
    if(this.cartList[index].quantity <= 1)
      return;
    this.cartList[index].quantity--;
    this.updateTotalPrice();
  }

  increaseQuantity(index : number){
    this.cartList[index].quantity++;
    this.updateTotalPrice();
  }

  updateTotalPrice(){
    this.totalPrice = 0;
    this.cartList.forEach(item => this.totalPrice += item.quantity * item.supplierCatalog.price)
  }

  clearCart(){
    this.cartList = [];
  }

}
