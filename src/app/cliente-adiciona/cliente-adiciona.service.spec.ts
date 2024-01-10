import { TestBed } from '@angular/core/testing';

import { ClienteAdicionaService } from './cliente-adiciona.service';

describe('ClienteAdicionaService', () => {
  let service: ClienteAdicionaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteAdicionaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
