import { TestBed } from '@angular/core/testing';
import { LoginVeterinario } from './login-veterinario';
import { By } from '@angular/platform-browser';

describe('LoginVeterinario', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LoginVeterinario] }).compileComponents();
  });

  it('crea el componente', () => {
    const fixture = TestBed.createComponent(LoginVeterinario);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deshabilita submit cuando el formulario es inválido', () => {
    const fixture = TestBed.createComponent(LoginVeterinario);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeTrue();
  });

  it('habilita submit cuando el formulario es válido', () => {
    const fixture = TestBed.createComponent(LoginVeterinario);
    const comp = fixture.componentInstance;
    comp.loginData = { correo: 'vet@demo.com', clave: 'secret6' };
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();
  });
});
