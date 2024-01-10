import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoAdicionarComponent } from './servico-adicionar.component';

describe('ServicoAdicionarComponent', () => {
  let component: ServicoAdicionarComponent;
  let fixture: ComponentFixture<ServicoAdicionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoAdicionarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
