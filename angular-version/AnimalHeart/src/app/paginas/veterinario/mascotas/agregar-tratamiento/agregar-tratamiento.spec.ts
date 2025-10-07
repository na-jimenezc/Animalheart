import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTratamiento } from './agregar-tratamiento';

describe('AgregarTratamiento', () => {
  let component: AgregarTratamiento;
  let fixture: ComponentFixture<AgregarTratamiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTratamiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTratamiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
