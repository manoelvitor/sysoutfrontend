import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrizacaoComponent } from './parametrizacao.component';

describe('ParametrizacaoComponent', () => {
  let component: ParametrizacaoComponent;
  let fixture: ComponentFixture<ParametrizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
