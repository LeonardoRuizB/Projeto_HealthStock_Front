import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { MarketplaceService } from 'src/app/service/models/marketplace/marketplace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/models/product/product.service';
import {  firstValueFrom } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination/pagination.service';
import { CategoryService } from 'src/app/service/models/category/category.service';
import { IProduct } from 'src/app/models/product';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  products : any[] = [];
  filters : FormGroup;
  loadingSearching : boolean = false;
  categories : ICategory[] = [];
  timer : any;

  constructor(
    private marketplaceService : MarketplaceService, private productService : ProductService,
    private activatedRoute : ActivatedRoute, private router : Router,
    private categoryService:CategoryService,
    public paginationService : PaginationService) {
    let fb = new FormBuilder();
      this.filters = fb.group({
        search: [ '' ]
      });
      this.paginationService.limitByPage = 25;
   }

   changeSearch(){
    this.loadingSearching = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.marketplaceService.searchProdutos(this.filters.value.search).subscribe({
        next: marketplaceResponse => {
          this.router.navigate(['marketplace'],{queryParams: {page: this.paginationService.pageNumber, search: this.filters.value.search}});
          this.products = marketplaceResponse;

          this.loadingSearching = false;
        }}),500);
  }

  ngOnInit(): void {
    this.marketplaceService.getProdutos(this.paginationService.limitByPage, this.paginationService.getOffset())
    .subscribe({
      next: products => {
        this.products = products;
      console.log(this.products)
      }
    });

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

  encode(url : string){
    return AppComponent.encodeURL(url);
  }
}