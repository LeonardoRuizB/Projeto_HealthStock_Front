import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { IPackageType } from 'src/app/models/packageType';
import { IPhoto } from 'src/app/models/photo';
import { IProduct } from 'src/app/models/product';
import { PackageTypeService } from 'src/app/service/packagetype/packagetype.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formCatalogue : FormGroup;
  selectedProduct : any;
  photos : IPhoto[] = [];
  packeges : IPackageType[] = [];


  constructor(private packageTypeService : PackageTypeService) {
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
  }

  ngOnInit(): void {
    this.selectedProduct = {id: 1, name: 'Caneta'};
  }

  onSubmit(){

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
    this.setProductId();  
  }

  setProductId(){
    this.formCatalogue.get('productId')?.setValue(this.selectedProduct.id);
  }

  removePhoto(index:number){
    this.photos.splice(index, 1);

  }

}
