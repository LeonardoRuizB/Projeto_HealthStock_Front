import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import {  firstValueFrom } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination/pagination.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category/category.service';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  filters : FormGroup
  products : IProduct[] = [];
  categories : ICategory[] = [];
  loadingSearching : boolean = false;
  timer : any;

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute, private router : Router,
    private categoryService:CategoryService,
    public paginationService : PaginationService) {
      let fb = new FormBuilder();
      this.filters = fb.group({
        search: [ '' ]
      });
    }

  changeSearch(){
    this.loadingSearching = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.productService.searchProdutos(this.filters.value.search, this.paginationService.limitByPage, this.paginationService.getOffset()).subscribe({
        next: productsResponse => {
          this.router.navigate(['produtos'],{queryParams: {page: this.paginationService.pageNumber, search: this.filters.value.search}});
          this.products = productsResponse[0];
          this.paginationService.setTotalItems(productsResponse[1]);
          this.loadingSearching = false;
        }}),500);
  }

  ngOnInit(): void {
    this.productService.getProdutos(this.paginationService.limitByPage, this.paginationService.getOffset())
      .subscribe({
        next: productsResponse => {
          this.products = productsResponse;
        }
      });

    this.initPagination();

    this.categoryService.getCategories().subscribe({
      next: response => {
        this.categories = response;
      }
    })

    
  }

  async initPagination(){
    let total = await firstValueFrom(this.productService.getTotalProdutos());

    this.paginationService.setPageNumber( await this.getPageNumber())
      .setTotalItems(total.total)
      .setTotalPages();
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
