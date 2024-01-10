import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDocumentoComponent } from './os-documento.component';

describe('OsDocumentoComponent', () => {
  let component: OsDocumentoComponent;
  let fixture: ComponentFixture<OsDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
