import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotasTotalesActivas } from './mascotas-totales-activas';

describe('MascotasTotalesActivas', () => {
  let component: MascotasTotalesActivas;
  let fixture: ComponentFixture<MascotasTotalesActivas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasTotalesActivas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasTotalesActivas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});