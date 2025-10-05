import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GananciasTotales } from './ganancias-totales';

describe('GananciasTotales', () => {
  let component: GananciasTotales;
  let fixture: ComponentFixture<GananciasTotales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GananciasTotales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GananciasTotales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
