import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalElement : HTMLElement | undefined;

  constructor() {

  }

  findAndSetModal(modalId:string){
    this.setModalElement(this.findElementBy(modalId));
  }

  
  private findElementBy(id:string){
		let element = document.getElementById(id);
		  	if(!element)
				throw new Error(id + " is not find");
		  	return element;
	}

  setModalElement(element:HTMLElement){
    this.modalElement = element;
  }

  showModal(){
    this.modalElement?.classList.add("is-active");
  }

  hideModal(){
    this.modalElement?.classList.remove("is-active");
  }
}
