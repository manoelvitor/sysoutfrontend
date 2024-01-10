import { TestBed } from '@angular/core/testing';

import { OsConsultaService } from './os-consulta.service';

describe('OsConsultaService', () => {
  let service: OsConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
