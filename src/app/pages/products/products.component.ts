import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.products = [
      {name:"Caneta Azul", img: ""},
      {name:"Caneta Vermelha", img: ""},
      {name:"Cadeira", img: ""}
    ];
  }

}
