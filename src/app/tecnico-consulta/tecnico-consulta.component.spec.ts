import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoConsultaComponent } from './tecnico-consulta.component';

describe('TecnicoConsultaComponent', () => {
  let component: TecnicoConsultaComponent;
  let fixture: ComponentFixture<TecnicoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
