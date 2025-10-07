import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeterinariosDetalle } from './veterinarios-detalle';

describe('VeterinariosDetalle', () => {
  let component: VeterinariosDetalle;
  let fixture: ComponentFixture<VeterinariosDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariosDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariosDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});