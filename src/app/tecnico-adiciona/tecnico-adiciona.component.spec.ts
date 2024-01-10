import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoAdicionaComponent } from './tecnico-adiciona.component';

describe('TecnicoAdicionaComponent', () => {
  let component: TecnicoAdicionaComponent;
  let fixture: ComponentFixture<TecnicoAdicionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoAdicionaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoAdicionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
