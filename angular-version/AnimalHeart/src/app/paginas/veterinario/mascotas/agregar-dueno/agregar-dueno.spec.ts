import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDueno } from './agregar-dueno';

describe('AgregarDueno', () => {
  let component: AgregarDueno;
  let fixture: ComponentFixture<AgregarDueno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDueno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDueno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});