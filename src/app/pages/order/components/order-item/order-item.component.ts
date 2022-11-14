import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  allSteps = Status;

  @Input() orderNumber : number = 0;
  @Input() step : Status = Status.Cart;

  constructor() { }

  ngOnInit(): void {
  }

}

export enum Status {
  Cart = 0,
  User = 1,
  Payment = 2,
  Delivery = 3,
  Confirmation = 4,
}
