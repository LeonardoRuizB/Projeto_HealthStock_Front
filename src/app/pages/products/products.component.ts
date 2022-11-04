import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import {  firstValueFrom } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : any[] = [];

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute,
    public paginationService : PaginationService) {}

  ngOnInit(): void {
    this.initPagination();
  }

  async initPagination(){
    
    this.paginationService.pageNumber = await this.getPageNumber(); 
    
    let total = await firstValueFrom(this.productService.getTotalProdutos());
    
    this.paginationService.totalItems = total.total;
    this.paginationService.totalPages = this.paginationService.totalItems / this.paginationService.limitByPage;

    let offset = this.paginationService.limitByPage * (this.paginationService.pageNumber - 1);
    console.log(offset);

    this.products = await firstValueFrom(this.productService.getProdutos(this.paginationService.limitByPage, offset));
  }

  updatePage(){
    this.initPagination();
  }

  async getPageNumber(){
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    return params['page'] ?? 1;
  }

}
