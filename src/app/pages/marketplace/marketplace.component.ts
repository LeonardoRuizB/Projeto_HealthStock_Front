import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from 'src/app/service/marketplace/marketplace.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  products : any[] = [];
  constructor(private marketplace : MarketplaceService) { }

  ngOnInit(): void {
    this.marketplace.getProdutos().subscribe({
      next: products => {
        this.products = products;
      console.log(this.products)
      }
    })
  }

}
