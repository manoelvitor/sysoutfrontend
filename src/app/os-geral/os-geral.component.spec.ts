import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsGeralComponent } from './os-geral.component';

describe('OsGeralComponent', () => {
  let component: OsGeralComponent;
  let fixture: ComponentFixture<OsGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
