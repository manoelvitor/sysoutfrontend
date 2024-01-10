import { TestBed } from '@angular/core/testing';

import { ServicoAdicionarService } from './servico-adicionar.service';

describe('ServicoAdicionarService', () => {
  let service: ServicoAdicionarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoAdicionarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
