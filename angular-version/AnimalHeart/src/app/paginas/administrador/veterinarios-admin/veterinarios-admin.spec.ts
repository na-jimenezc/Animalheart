import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeterinariosAdminComponent } from './veterinarios-admin';

describe('VeterinariosAdmin', () => {
  let component: VeterinariosAdminComponent;
  let fixture: ComponentFixture<VeterinariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});