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

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute, private router : Router,
    public paginationService : PaginationService) {}

  ngOnInit(): void {
    this.initPagination();
  }

  async initPagination(){
    
    let total = await firstValueFrom(this.productService.getTotalProdutos());
    this.paginationService.setPageNumber( await this.getPageNumber())
    
    
    this.paginationService.setTotalItems(total.total)
      .setTotalPages();

    this.products = await firstValueFrom(this.productService.getProdutos(this.paginationService.limitByPage, this.paginationService.getOffset()));
  }

  updatePage(){
    this.initPagination();
  }

  async getPageNumber(){
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    return params['page'] ?? 1;
  }

  nextPage(){
    this.paginationService.nextPage();
    this.router.navigate(['produtos'],{queryParams: {page: this.paginationService.pageNumber}} );
  }

  previusPage(){
    this.paginationService.previusPage();
    this.router.navigate(['produtos'],{queryParams: {page: this.paginationService.pageNumber}} )
  }

}
