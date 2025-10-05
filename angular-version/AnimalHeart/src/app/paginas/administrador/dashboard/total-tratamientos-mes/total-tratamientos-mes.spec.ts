import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTratamientosMes } from './total-tratamientos-mes';

describe('TotalTratamientosMes', () => {
  let component: TotalTratamientosMes;
  let fixture: ComponentFixture<TotalTratamientosMes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalTratamientosMes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalTratamientosMes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
