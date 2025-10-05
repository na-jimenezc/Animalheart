import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariosAdmin } from './veterinarios-admin';

describe('VeterinariosAdmin', () => {
  let component: VeterinariosAdmin;
  let fixture: ComponentFixture<VeterinariosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariosAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariosAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
