import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoConsultaComponent } from './servico-consulta.component';

describe('ServicoConsultaComponent', () => {
  let component: ServicoConsultaComponent;
  let fixture: ComponentFixture<ServicoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
