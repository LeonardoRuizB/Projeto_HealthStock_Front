import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Photo } from 'src/app/models/photo';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MarketplaceService } from 'src/app/service/models/marketplace/marketplace.service';

@Component({
  selector: 'app-marketplace-product',
  templateUrl: './marketplace-product.component.html',
  styleUrls: ['./marketplace-product.component.scss']
})
export class MarketplaceProductComponent implements OnInit {

  product : ISupplierCatogue | undefined;
  selectedPhoto : Photo | undefined;
  isSupplier : boolean ;

  constructor(private marketplaceService:MarketplaceService, private router:Router,
    private route : ActivatedRoute, private title : Title, public authService : AuthService) {
      try {
        this.isSupplier = this.authService.getUserType() == 'supplier';
      } catch (error) {
        this.isSupplier = false;
      }
    }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const searchText = AppComponent.decodeURL(params['produto']);

      this.title.setTitle("HealthStock - Marketplace - " + searchText);


      this.marketplaceService.getProduto(searchText).subscribe({
        next:product => {
          this.product = product;
          this.selectedPhoto = this.product.photos[0];
        },
        error:error => this.router.navigate(['marketplace'])
      });
    });
  }

  addCart(){
    if(!this.product)
      return

    this.marketplaceService.addCart({id: 1, supplierCatalog: this.product, quantity: 1});

    this.router.navigate(['carrinho'])
  }

}
