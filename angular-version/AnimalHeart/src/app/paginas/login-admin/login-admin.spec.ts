import { TestBed } from '@angular/core/testing';
import { LoginAdmin } from './login-admin';
import { By } from '@angular/platform-browser';

describe('LoginAdmin', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdmin],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginAdmin);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should disable submit when form is invalid', () => {
    const fixture = TestBed.createComponent(LoginAdmin);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeTrue();
  });

  it('should enable submit when form is valid', () => {
    const fixture = TestBed.createComponent(LoginAdmin);
    const comp = fixture.componentInstance;
    comp.loginData = { correo: 'admin@demo.com', clave: 'secret6' };
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();
  });
});
