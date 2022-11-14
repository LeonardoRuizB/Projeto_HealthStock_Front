import { Component, Input, OnInit } from '@angular/core';
import { Status } from './components/order-item/order-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  ordersStatus : any[] = [
    
  ];
  allSteps = Status;

  constructor() { }

  ngOnInit(): void {
  }

}
