import { Component, OnInit } from '@angular/core';
import Supplier from 'src/app/models/supplier';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CatalogueService } from 'src/app/service/models/catalogue/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  catalogue : ISupplierCatogue[] = []
  supplier : Supplier;

  constructor(private authService:AuthService, private catalogueService:CatalogueService) {
    try {
      this.supplier = this.authService.getUserData();
    }
    catch(error) {
      this.authService.needBeAuth();
      this.supplier = new Supplier({});
    }
  }

  ngOnInit(): void {
    this.authService.needBeAuth();
    this.authService.needBeSupplier();

    this.catalogueService.getCatalogue(this.supplier.id).subscribe({
      next: catalogue => {
        this.catalogue = catalogue;
        this.catalogue.push(this.catalogue[0],this.catalogue[0],this.catalogue[0],this.catalogue[0]);
        this.catalogue.push(this.catalogue[0],this.catalogue[0],this.catalogue[0],this.catalogue[0]);
      }
    })

  }

}
