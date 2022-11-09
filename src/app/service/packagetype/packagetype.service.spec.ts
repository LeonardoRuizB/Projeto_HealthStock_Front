import { TestBed } from '@angular/core/testing';

import { PackagetypeService } from './packagetype.service';

describe('PackagetypeService', () => {
  let service: PackagetypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagetypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
