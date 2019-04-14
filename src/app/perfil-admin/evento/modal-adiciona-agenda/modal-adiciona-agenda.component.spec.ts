import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionaAgendaComponent } from './modal-adiciona-agenda.component';

describe('ModalAdicionaAgendaComponent', () => {
  let component: ModalAdicionaAgendaComponent;
  let fixture: ComponentFixture<ModalAdicionaAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdicionaAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionaAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
