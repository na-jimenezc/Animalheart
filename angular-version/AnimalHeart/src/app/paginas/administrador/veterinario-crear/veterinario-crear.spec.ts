import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioCrear } from './veterinario-crear';

describe('VeterinarioCrear', () => {

  
  let component: VeterinarioCrear;
  let fixture: ComponentFixture<VeterinarioCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioCrear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioCrear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
