import { TestBed } from '@angular/core/testing';

import { EmpresaEditarService } from './empresa-editar.service';

describe('EmpresaEditarService', () => {
  let service: EmpresaEditarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaEditarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
