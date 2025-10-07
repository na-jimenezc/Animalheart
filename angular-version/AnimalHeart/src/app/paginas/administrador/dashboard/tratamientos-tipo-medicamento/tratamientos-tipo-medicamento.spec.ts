import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TratamientosTipoMedicamento } from './tratamientos-tipo-medicamento';

describe('TratamientosTipoMedicamento', () => {
  let component: TratamientosTipoMedicamento;
  let fixture: ComponentFixture<TratamientosTipoMedicamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientosTipoMedicamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientosTipoMedicamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});