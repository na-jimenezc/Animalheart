import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPrincipal } from './tarjeta-principal';

describe('TarjetaPrincipal', () => {
  let component: TarjetaPrincipal;
  let fixture: ComponentFixture<TarjetaPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
