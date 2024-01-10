import { TestBed } from '@angular/core/testing';

import { TecnicoConsultaService } from './tecnico-consulta.service';

describe('TecnicoConsultaService', () => {
  let service: TecnicoConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnicoConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
