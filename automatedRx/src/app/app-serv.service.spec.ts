import { TestBed, inject } from '@angular/core/testing';

import { AppServService } from './app-serv.service';

describe('AppServService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppServService]
    });
  });

  it('should be created', inject([AppServService], (service: AppServService) => {
    expect(service).toBeTruthy();
  }));
});
