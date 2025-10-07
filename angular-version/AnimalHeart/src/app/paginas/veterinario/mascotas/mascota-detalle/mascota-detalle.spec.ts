import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotaDetalle } from './mascota-detalle';

describe('MascotaDetalle', () => {
  let component: MascotaDetalle;
  let fixture: ComponentFixture<MascotaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});