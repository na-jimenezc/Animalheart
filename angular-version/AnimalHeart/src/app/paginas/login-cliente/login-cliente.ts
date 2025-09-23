import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

type LoginClienteData = { correo: string; clave: string };

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-cliente.html',
  styleUrl: './login-cliente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCliente {
  data: LoginClienteData = { correo: '', clave: '' };
  mostrar = false;
  cargando = false;
  error = '';

  toggle() { this.mostrar = !this.mostrar; }

  async onSubmit(form: NgForm) {
    if (form.invalid) { form.control.markAllAsTouched(); return; }
    this.cargando = true; this.error = '';
    try {
      const ok = this.data.correo.includes('@') && this.data.clave.length >= 6;
      await new Promise(r => setTimeout(r, 500));
      if (!ok) throw new Error('bad');

      window.location.href = '/cliente/panel';
    } catch {
      this.error = 'Credenciales inválidas o servidor no disponible.';
    } finally {
      this.cargando = false;
    }
  }

  reset(form: NgForm) {
    form.resetForm();
    this.error = '';
    this.mostrar = false;
  }
}
