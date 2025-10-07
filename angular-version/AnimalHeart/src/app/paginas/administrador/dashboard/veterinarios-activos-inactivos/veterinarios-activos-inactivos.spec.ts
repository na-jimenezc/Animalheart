import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeterinariosActivosInactivos } from './veterinarios-activos-inactivos';

describe('VeterinariosActivosInactivos', () => {
  let component: VeterinariosActivosInactivos;
  let fixture: ComponentFixture<VeterinariosActivosInactivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariosActivosInactivos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariosActivosInactivos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});