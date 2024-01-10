import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDetalhesComponent } from './os-detalhes.component';

describe('OsDetalhesComponent', () => {
  let component: OsDetalhesComponent;
  let fixture: ComponentFixture<OsDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
