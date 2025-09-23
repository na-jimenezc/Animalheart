import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

type LoginData = {
  correo: string;
  clave: string;
};

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAdmin {
  loginData: LoginData = { correo: '', clave: '' };
  mostrarClave = false;
  cargando = false;
  mensajeError = '';

  togglePassword(): void {
    this.mostrarClave = !this.mostrarClave;
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    try {
      const ok = this.loginData.correo.includes('admin') && this.loginData.clave.length >= 6;
      await new Promise(r => setTimeout(r, 600));

      if (!ok) {
        throw new Error('Credenciales inválidas');
      }

      window.location.href = '/admin/dashboard';
    } catch (e) {
      this.mensajeError = 'Credenciales inválidas o servidor no disponible.';
    } finally {
      this.cargando = false;
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.mensajeError = '';
    this.mostrarClave = false;
  }
}
