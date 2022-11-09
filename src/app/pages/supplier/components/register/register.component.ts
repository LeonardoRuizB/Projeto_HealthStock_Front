import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { IPackageType } from 'src/app/models/packageType';
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
  photos : any[] = [];
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

  onChangeImage($event:Event){
    
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

}
