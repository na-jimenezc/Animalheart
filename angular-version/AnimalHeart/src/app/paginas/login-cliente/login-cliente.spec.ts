import { TestBed } from '@angular/core/testing';
import { LoginCliente } from './login-cliente';
import { By } from '@angular/platform-browser';

describe('LoginCliente', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LoginCliente] }).compileComponents();
  });

  it('debe crearse', () => {
    const fixture = TestBed.createComponent(LoginCliente);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deshabilita enviar cuando el form es inválido', () => {
    const fixture = TestBed.createComponent(LoginCliente);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeTrue();
  });

  it('habilita enviar cuando el form es válido', () => {
    const fixture = TestBed.createComponent(LoginCliente);
    const comp = fixture.componentInstance;
    comp.data = { correo: 'cliente@demo.com', clave: 'secret6' };
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();
  });
});
