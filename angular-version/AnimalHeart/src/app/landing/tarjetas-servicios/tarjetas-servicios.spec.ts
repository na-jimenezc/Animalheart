import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasServicios } from './tarjetas-servicios';

describe('TarjetasServicios', () => {
  let component: TarjetasServicios;
  let fixture: ComponentFixture<TarjetasServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetasServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});