import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOsClienteComponent } from './consulta-os-cliente.component';

describe('ConsultaOsClienteComponent', () => {
  let component: ConsultaOsClienteComponent;
  let fixture: ComponentFixture<ConsultaOsClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaOsClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaOsClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
