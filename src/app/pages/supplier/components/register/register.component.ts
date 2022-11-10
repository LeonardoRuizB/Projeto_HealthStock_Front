import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { IPackageType } from 'src/app/models/packageType';
import { IPhoto } from 'src/app/models/photo';
import { IProduct } from 'src/app/models/product';
import { ModalService } from 'src/app/service/bulma/modal/modal.service';
import { PackageTypeService } from 'src/app/service/packagetype/packagetype.service';
import { ProductService } from 'src/app/service/product/product.service';

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


  constructor(private packageTypeService : PackageTypeService, public modalService : ModalService, private productsService : ProductService) {
    this.formCatalogue = new FormBuilder().group({
      productId:[ 0],
      name: [''],
      description: [''],
      packageTypeId: [ 0]
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
    this.modalService.findAndSetModal('products-modal');
  }

  onSubmit(){
    this.setProductId();
    console.table(this.formCatalogue.value);
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
