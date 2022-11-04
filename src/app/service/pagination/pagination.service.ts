import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  totalItems : number = 0;
  pageNumber : number = 1;
  totalPages : number = 0;
  limitByPage : number = 25;

  constructor() {}

  getOffset(){
    return this.limitByPage * (this.pageNumber - 1);
  }

  setPageNumber(pageNumber : number){
    this.pageNumber = pageNumber;
    return this;
  }

  setTotalItems(total : number){
    this.totalItems = total;
    return this;
  }

  setTotalPages(){
    this.totalPages = this.totalItems / this.limitByPage;
    return this;
  }

  nextPage(){
    if(this.pageNumber < this.totalPages)
      this.pageNumber++;
  }

  previusPage(){
    if(this.pageNumber > 1)
      this.pageNumber--;
  }

  isLastPage(){
    return this.pageNumber == this.totalPages;
  }

  isFirstPage(){
    return this.pageNumber == 1;
  }
}
