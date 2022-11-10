import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/service/models/product/product.service';
import { CategoryService } from 'src/app/service/models/category/category.service';
import { NotificationService } from 'src/app/service/bulma/notification/notification.service';
import { IPhoto } from 'src/app/models/photo';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  formProduto: FormGroup;
  categories: any = [];
  photo : IPhoto | undefined;

  get nameInput() { return this.formProduto.get('name'); }
  get categoryInput() { return this.formProduto.get('categoryId'); }

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
    if(!this.formProduto.valid){
      this.notificationService.showMessage("Campos não está preenchidos")
      return;
    }
      
    this.productService.createProduto(this.formProduto.value).subscribe({
      next: response => {
        if(this.photo)
          this.productService.uploadPhoto(response.id, this.photo).subscribe({
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

        this.formProduto.reset();
        this.removePhoto();
      },
      error: errorResponse => {
        this.notificationService.showMessage("Erro ao cadastrar produto");
      }
    });
  }

  onChangeFileInput(event: Event){
    const input = event.target as HTMLInputElement;
    if(!input.files)
      return;

    let tempFile = input.files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      this.photo = { title: tempFile.name, data: reader.result as string, mimeType: tempFile.type};
    }

    reader.readAsDataURL(tempFile);
  }

  removePhoto(){
    this.photo = undefined;
  }
}
