import { TestBed } from '@angular/core/testing';

import { OsDetalhesService } from './os-detalhes.service';

describe('OsDetalhesService', () => {
  let service: OsDetalhesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsDetalhesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
