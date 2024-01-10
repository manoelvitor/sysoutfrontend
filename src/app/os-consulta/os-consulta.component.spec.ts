import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsConsultaComponent } from './os-consulta.component';

describe('OsConsultaComponent', () => {
  let component: OsConsultaComponent;
  let fixture: ComponentFixture<OsConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
