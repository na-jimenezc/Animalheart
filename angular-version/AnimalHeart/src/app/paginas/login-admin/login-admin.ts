import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdministradorService } from '../../core/services/administrador.service';

type LoginData = { correo: string; clave: string; };

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-admin.html',
  styleUrls: ['./login-admin.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAdmin {
  loginData: LoginData = { correo: '', clave: '' };
  mostrarClave = false;
  cargando = false;
  mensajeError = '';

  constructor(private router: Router, private adminService: AdministradorService) {}

  togglePassword(): void { this.mostrarClave = !this.mostrarClave; }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.mensajeError = '';

    this.adminService.login(this.loginData.correo, this.loginData.clave).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (err) => {
        console.error('Error en login:', err);
        this.mensajeError = err?.status === 401
          ? 'Credenciales incorrectas. Verifica tu correo y contraseña.'
          : (err?.error?.message || 'Error del servidor. Intenta nuevamente más tarde.');
      },
      complete: () => (this.cargando = false),
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.mensajeError = '';
    this.mostrarClave = false;
  }
}