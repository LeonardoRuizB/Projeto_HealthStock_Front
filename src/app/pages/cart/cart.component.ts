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

    this.cartList.push({
      id: 1,
      quantity: 2,
      supplierCatalog: {
        id: 1, name: "Caneta Bic - 50 canetas", description: "Lorem ipsum", price: 10.00,
        packageTypeId: 1, productId:1, supplierId:1,
        photo: {title:"", data:"", mimeType:"", type:""},
      }
    });

    this.cartList.push({
      id: 1,
      quantity: 2,
      supplierCatalog: {
        id: 1, name: "Caneta Bic - 50 canetas", description: "Lorem ipsum", price: 10.00,
        packageTypeId: 1, productId:1, supplierId:1,
        photo: {title:"", data:"https://bulma.io/images/placeholders/128x128.png", mimeType:"", type:""},
      }
    });

    this.cartList.push({
      id: 1,
      quantity: 2,
      supplierCatalog: {
        id: 1, name: "Caneta Bic - 50 canetas", description: "Lorem ipsum", price: 10.00,
        packageTypeId: 1, productId:1, supplierId:1,
        photo: {title:"", data:"https://bulma.io/images/placeholders/128x128.png", mimeType:"image/png", type:"png"},
      }
    });

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
  }

  decreaseQuantity(index : number){
    if(this.cartList[index].quantity <= 1)
      return;
    this.cartList[index].quantity--;
  }

  increaseQuantity(index : number){
    this.cartList[index].quantity++;
  }

  updateTotalPrice(){
    this.cartList.forEach(item => this.totalPrice += item.quantity * item.supplierCatalog.price)
  }

  clearCart(){
    this.cartList = [];
  }

}
