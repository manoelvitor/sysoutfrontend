import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessorioComponent } from './acessorio.component';

describe('AcessorioComponent', () => {
  let component: AcessorioComponent;
  let fixture: ComponentFixture<AcessorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessorioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
