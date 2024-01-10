import { TestBed } from '@angular/core/testing';

import { OsDocumentoService } from './os-documento.service';

describe('OsDocumentoService', () => {
  let service: OsDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
