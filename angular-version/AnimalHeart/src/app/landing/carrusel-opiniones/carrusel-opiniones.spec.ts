import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarruselOpiniones } from './carrusel-opiniones';

describe('CarruselOpiniones', () => {
  let component: CarruselOpiniones;
  let fixture: ComponentFixture<CarruselOpiniones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselOpiniones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselOpiniones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});