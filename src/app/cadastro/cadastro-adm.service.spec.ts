import { TestBed } from '@angular/core/testing';

import { CadastroAdmService } from './cadastro-adm.service';

describe('CadastroAdmService', () => {
  let service: CadastroAdmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroAdmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
