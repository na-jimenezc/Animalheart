import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVeterinario } from './login-veterinario';

describe('LoginVeterinario', () => {
  let component: LoginVeterinario;
  let fixture: ComponentFixture<LoginVeterinario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVeterinario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginVeterinario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
