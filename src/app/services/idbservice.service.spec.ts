import { TestBed } from '@angular/core/testing';

import { IDBServiceService } from './idbservice.service';

describe('IDBServiceService', () => {
  let service: IDBServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IDBServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
