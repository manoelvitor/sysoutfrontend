import { TestBed } from '@angular/core/testing';

import { ConsultaOsClienteService } from './consulta-os-cliente.service';

describe('ConsultaOsClienteService', () => {
  let service: ConsultaOsClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaOsClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
