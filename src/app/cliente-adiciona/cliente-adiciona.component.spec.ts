import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAdicionaComponent } from './cliente-adiciona.component';

describe('ClienteAdicionaComponent', () => {
  let component: ClienteAdicionaComponent;
  let fixture: ComponentFixture<ClienteAdicionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteAdicionaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAdicionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
