import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { IPackageType } from 'src/app/models/packageType';
import { IPhoto, Photo } from 'src/app/models/photo';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ModalService } from 'src/app/service/bulma/modal/modal.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { PackageTypeService } from 'src/app/service/models/packagetype/packagetype.service';
import { ProductService } from 'src/app/service/models/product/product.service';
import { SupplierCatalogService } from 'src/app/service/models/supplierCatalog/supplier-catalog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formCatalogue : FormGroup;
  temporaryProduct : {id: number, name: string, path:string} = {id: 0, name: 'Ex. Caneta', path:''};
  selectedProduct : {id: number, name: string, path:string} = {id: 0, name: 'Ex. Caneta', path:''};
  photos : Photo[] = [];
  packeges : IPackageType[] = [];
  products : any[] = []


  constructor(private packageTypeService : PackageTypeService, public modalService : ModalService,
    private productsService : ProductService, private catalogService : SupplierCatalogService,
    private notificationService : NotificationService, private authService : AuthService, private sanitizer : DomSanitizer) {
      this.authService.needBeAuth();

    this.formCatalogue = new FormBuilder().group({
      productId: 0,
      name: '',
      description: '',
      packageTypeId: 0,
      supplierId: this.authService.getUserData().id,
      price: 0
    });

    packageTypeService.getPackageType().subscribe({
      next: packageTypes => {
        this.packeges = packageTypes;
      }
    });

    productsService.getProdutos(100).subscribe({
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
    if(!this.formCatalogue.valid)
      return;
    
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
      this.photos.push(new Photo({ title: tempFile.name, data: tempFile, mimeType: tempFile.type}));
    });

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

  getBlob(photo:Photo){
    return this.sanitizer.bypassSecurityTrustUrl(photo.base64);
  }

}
