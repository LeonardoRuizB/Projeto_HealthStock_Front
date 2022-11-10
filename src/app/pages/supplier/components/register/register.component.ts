import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IPackageType } from 'src/app/models/packageType';
import { IPhoto } from 'src/app/models/photo';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ModalService } from 'src/app/service/bulma/modal/modal.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { PackageTypeService } from 'src/app/service/packagetype/packagetype.service';
import { ProductService } from 'src/app/service/product/product.service';
import { SupplierCatalogService } from 'src/app/service/supplierCatalog/supplier-catalog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formCatalogue : FormGroup;
  temporaryProduct : {id: number, name: string, path:string} = {id: 0, name: 'Ex. Caneta', path:''};
  selectedProduct : {id: number, name: string, path:string} = {id: 0, name: 'Ex. Caneta', path:''};
  photos : IPhoto[] = [];
  packeges : IPackageType[] = [];
  products : any[] = []


  constructor(private packageTypeService : PackageTypeService, public modalService : ModalService,
    private productsService : ProductService, private catalogService : SupplierCatalogService,
    private notificationService : NotificationService, private authService : AuthService,) {
      this.authService.needBeAuth();

    this.formCatalogue = new FormBuilder().group({
      productId: 0,
      name: '',
      description: '',
      packageTypeId: 0,
      supplierId: this.authService.getUserData().id
    });

    packageTypeService.getPackageType().subscribe({
      next: packageTypes => {
        this.packeges = packageTypes;
      }
    });

    productsService.getProdutos().subscribe({
      next: products => {
        this.products = products;
      }
    })
  }

  ngOnInit(): void {
    this.authService.needBeSupplier();

    this.modalService.findAndSetModal('products-modal');
  }

  onSubmit(){
    this.setProductId();
  
    this.catalogService.createProduct(this.formCatalogue.value).subscribe({
      next: response => {
        if(this.photos)
          this.catalogService.uploadPhotos(response.id, this.photos).subscribe({
            next: response => {
              this.notificationService.showMessage('Produto cadastrado com sucesso!');
            },
            error: errorResponse => {
              this.notificationService.showMessage('Produto cadastrado com sucesso!');
              this.notificationService.showMessage('Erro ao cadastrar foto!');
            }
          });
        else 
          this.notificationService.showMessage('Produto cadastrado com sucesso!');

        this.formCatalogue.reset();
        this.photos = [];
      },
      error: errorResponse => {
        this.notificationService.showMessage("Erro ao cadastrar produto");
      }
    });
  }

  onChangeImage(event:Event){
    const input = event.target as HTMLInputElement;
    if(!input.files)
      return;

    let tempFiles = Array.from(input.files);
    
    tempFiles.map( tempFile => {
      const reader = new FileReader();

      reader.onload = () => {
        this.photos.push({ title: tempFile.name, data: reader.result as string, mimeType: tempFile.type});
      }

      reader.readAsDataURL(tempFile);
    })
    

  }

  outDescription(event : Event){
    let target = event.target as HTMLTextAreaElement;
    target.value = target.value.trim()
  }

  selectProduct(){
    this.temporaryProduct = {id: 0, name: "", path: ''};
    this.modalService.showModal();
    this.setProductId();
  }

  setTemporaryProduct(id: number, name:string, path:string){
    this.temporaryProduct.id = id;
    this.temporaryProduct.name = name;
    this.temporaryProduct.path = path;
  }

  confirmProduct(){
    this.modalService.hideModal();
    this.selectedProduct = this.temporaryProduct;
  }

  setProductId(){
    this.formCatalogue.get('productId')?.setValue(this.selectedProduct.id);
  }

  removePhoto(index:number){
    this.photos.splice(index, 1);
  }

}
