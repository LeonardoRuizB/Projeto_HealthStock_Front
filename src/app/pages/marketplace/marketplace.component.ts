import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarketplaceService } from 'src/app/service/marketplace/marketplace.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  
  products : any[] = [];
  filters : FormGroup;
  loadingSearching : boolean = false;
  timer : any;

  constructor(private marketplaceService : MarketplaceService) {
    let fb = new FormBuilder();
      this.filters = fb.group({
        search: [ '' ]
      });
   }

  ngOnInit(): void {
    this.marketplaceService.getProdutos().subscribe({
      next: products => {
        this.products = products;
      console.log(this.products)
      }
    })
  }
  changeSearch(){
    this.loadingSearching = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.marketplaceService.getProdutos().subscribe({
        next: marketplaceResponse => {
          // this.router.navigate(['produtos'],{queryParams: {page: this.paginationService.pageNumber, search: this.filters.value.search}});
          this.products = marketplaceResponse;
          // this.paginationService.setTotalItems(productsResponse[1]);
          this.loadingSearching = false;
        }}),500);
  } 
 }

