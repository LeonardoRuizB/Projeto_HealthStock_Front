import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import {  firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  totalProdutcs : number = 0;
  pageNumber : number = 1;
  totalPages : number = 0;
  productsByPage : number = 2;

  products : any[] = [];

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.initPagination();
  }

  async initPagination(){
    
    this.pageNumber = await this.getPageNumber(); 
    
    let total = await firstValueFrom(this.productService.getTotalProdutos());
    this.totalProdutcs = total.total;

    this.totalPages = this.totalProdutcs / this.productsByPage;
    let offset = this.productsByPage * (this.pageNumber - 1);
    console.log(offset);

    this.products = await firstValueFrom(this.productService.getProdutos(this.productsByPage, offset));
  }

  updatePage(){
    this.initPagination();
  }

  async getPageNumber(){
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    return params['page'] ?? 1;
  }

}
