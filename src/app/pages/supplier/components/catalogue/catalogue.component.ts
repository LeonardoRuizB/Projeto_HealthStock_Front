import { Component, OnInit } from '@angular/core';
import Supplier from 'src/app/models/supplier';
import { ISupplierCatogue } from 'src/app/models/supplierCatalogue';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ModalService } from 'src/app/service/bulma/modal/modal.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { CatalogueService } from 'src/app/service/models/catalogue/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  catalogue : ISupplierCatogue[] = [];
  productToDelete : any; 
  supplier : Supplier;

  constructor(private authService:AuthService, private catalogueService:CatalogueService,
    public modalService : ModalService, private notification : NotificationService) {
    try {
      this.supplier = this.authService.getUserData() as Supplier;
    }
    catch(error) {
      this.authService.needBeAuth();
      this.supplier = new Supplier({});
    }
  }

  ngOnInit(): void {
    this.authService.needBeAuth();
    this.authService.needBeSupplier();

    this.modalService.findAndSetModal('delete-modal');

    this.catalogueService.getCatalogue(this.supplier.id).subscribe({
      next: catalogue => {
        this.catalogue = catalogue;
      }
    })

  }

  deleteProdut(){
    this.catalogueService.deleteCatalogue(this.supplier.id, this.productToDelete.id).subscribe({
      next: () => this.notification.showMessage('Produto deletado com sucesso!'),
      error: () => this.notification.showMessage('Produto não deletado! Erro ao executar ação!')
    });

    this.modalService.hideModal();
  }

  showDeleteModal(productIndex: number){
    this.productToDelete = this.catalogue[productIndex];

    this.modalService.showModal();
  }

}
