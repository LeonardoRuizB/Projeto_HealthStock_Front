import { TestBed } from '@angular/core/testing';

import { SupplierCatalogService } from './supplier-catalog.service';

describe('SupplierCatalogService', () => {
  let service: SupplierCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
