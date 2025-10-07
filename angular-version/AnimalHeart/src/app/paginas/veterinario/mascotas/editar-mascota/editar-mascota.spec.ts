import { TestBed } from '@angular/core/testing';
import { EditarMascota } from './editar-mascota';

describe('EditarMascota', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMascota],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EditarMascota);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });
});