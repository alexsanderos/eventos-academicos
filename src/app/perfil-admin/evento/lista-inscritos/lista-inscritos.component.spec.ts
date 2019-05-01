import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInscritosComponent } from './lista-inscritos.component';

describe('ListaInscritosComponent', () => {
  let component: ListaInscritosComponent;
  let fixture: ComponentFixture<ListaInscritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInscritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
