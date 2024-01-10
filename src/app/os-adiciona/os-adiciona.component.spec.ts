import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsAdicionaComponent } from './os-adiciona.component';

describe('OsAdicionaComponent', () => {
  let component: OsAdicionaComponent;
  let fixture: ComponentFixture<OsAdicionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsAdicionaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsAdicionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
