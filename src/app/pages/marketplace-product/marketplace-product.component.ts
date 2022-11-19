import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { MarketplaceService } from 'src/app/service/models/marketplace/marketplace.service';

@Component({
  selector: 'app-marketplace-product',
  templateUrl: './marketplace-product.component.html',
  styleUrls: ['./marketplace-product.component.scss']
})
export class MarketplaceProductComponent implements OnInit {

  id : number = 3;
  product : ISupplierCatogue | undefined;
  constructor(private marketplaceService:MarketplaceService, private router:Router) {}

  ngOnInit(): void {
    this.marketplaceService.getProduto(this.id).subscribe({
      next:product=> this.product = product,
      error:error=> this.router.navigate(['marketplace'])
    });
  }

  addCart(){
    if(this.product !== undefined)
    this.marketplaceService.addCart({id: 1, supplierCatalog: this.product, quantity: 1})
  }

}
