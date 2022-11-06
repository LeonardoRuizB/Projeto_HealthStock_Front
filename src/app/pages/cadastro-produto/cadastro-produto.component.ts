import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/service/product/product.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  formProduto: FormGroup;
  categories: any = [];
  photos : any[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private notificationService: NotificationService) {
      let formBuilder = new FormBuilder();

    this.formProduto = formBuilder.group({
      name: [''],
      description: [''],
      categoryId: ['']
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe({
        next: response => {
          this.categories = response;
        }
      })
  }
  onSubmit() {
    this.notificationService.showMessage('Produto cadastrado com sucesso!');
    /*this.productService.createProduto(this.formProduto.value).subscribe({
      next: response => {
        this.notificationService.showMessage('Produto cadastrado com sucesso!');
      }
    });
    */
    this.formProduto.reset();

    console.log(this.formProduto.value)
  }

  onUpload(){

  }

  onChangeFileInput(event: Event){
    const input = event.target as HTMLInputElement;
    let tempFiles = [].slice.call(input.files);
    let photoFiles : any[] = [];
    
    const reader = new FileReader();
    tempFiles.forEach((value : any, index) => {
      let photoFile = {name:'', data:{}};

      reader.onload = () => {
        photoFile.name = value.name;
        photoFile.data = reader.result as string;
      }

      photoFiles.push(photoFile);

      reader.readAsDataURL(value);
    });

    this.photos.push(...photoFiles);

    this.updatePreview();
  }

  updatePreview(){
    console.log(this.photos);
  }
}
