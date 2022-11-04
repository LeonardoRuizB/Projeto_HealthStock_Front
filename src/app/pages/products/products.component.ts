import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import {  firstValueFrom } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination/pagination.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() filters : FormGroup
  timer : any;
  products : any[] = [];
  loadingSearching : boolean = false;

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute, private router : Router,
    public paginationService : PaginationService) {
      this.filters = new FormBuilder().group({
        search: [ '' ],
        category: [ '' ]
      });
    }

  changeSearch(){
    this.loadingSearching = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.productService.searchProdutos(this.filters.value.search, ).subscribe({
        next: productsResponse => {
          this.router.navigate(['produtos'],{queryParams: {page: this.paginationService.pageNumber, search: this.filters.value.search}});
          this.products = productsResponse;
          this.loadingSearching = false;
        }}),500);
  }

  ngOnInit(): void {
    this.initPagination();
  }

  async initPagination(){
    let total = await firstValueFrom(this.productService.getTotalProdutos());
    this.paginationService.setPageNumber( await this.getPageNumber())
      .setTotalItems(total.total)
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
    this.updatePage();
  }

  previusPage(){
    this.paginationService.previusPage();
    this.router.navigate(['produtos'],{queryParams: {page: this.paginationService.pageNumber}} );
    this.updatePage();
  }

}
