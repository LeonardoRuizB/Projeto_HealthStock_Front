import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  totalItems : number = 0;
  pageNumber : number = 1;
  totalPages : number = 0;
  limitByPage : number = 2;

  constructor() {
    
  }
}
