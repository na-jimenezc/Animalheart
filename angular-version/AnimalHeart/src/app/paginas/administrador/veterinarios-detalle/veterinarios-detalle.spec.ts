import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeterinariosAdminComponent } from '../veterinarios-admin/veterinarios-admin';
import { VeterinariosDetalleComponent } from './veterinarios-detalle';

describe('VeterinariosDetalle', () => {
  let component: VeterinariosDetalleComponent;
  let fixture: ComponentFixture<VeterinariosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariosDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});