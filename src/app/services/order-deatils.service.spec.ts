import { TestBed } from '@angular/core/testing';

import { OrderDeatilsService } from './order-deatils.service';

describe('OrderDeatilsService', () => {
  let service: OrderDeatilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDeatilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
