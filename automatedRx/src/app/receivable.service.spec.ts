import { TestBed, inject } from '@angular/core/testing';

import { ReceivableService } from './receivable.service';

describe('ReceivableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceivableService]
    });
  });

  it('should be created', inject([ReceivableService], (service: ReceivableService) => {
    expect(service).toBeTruthy();
  }));
});
