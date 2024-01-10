import { TestBed } from '@angular/core/testing';

import { OsGeralServiceService } from './os-geral-service.service';

describe('OsGeralServiceService', () => {
  let service: OsGeralServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsGeralServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
