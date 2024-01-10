import { TestBed } from '@angular/core/testing';

import { ServicoConsultaService } from './servico-consulta.service';

describe('ServicoConsultaService', () => {
  let service: ServicoConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
