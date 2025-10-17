import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasTotales } from './ventas-totales';
import { CommonModule } from '@angular/common';

describe('VentasTotales', () => {
  let component: VentasTotales;
  let fixture: ComponentFixture<VentasTotales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasTotales, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasTotales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});