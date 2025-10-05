// login-admin.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdministradorService } from '../../services/administrador.service';

type LoginData = {
  correo: string;
  clave: string;
};

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAdmin {
  loginData: LoginData = { correo: '', clave: '' };
  mostrarClave = false;
  cargando = false;
  mensajeError = '';

  constructor(
    private router: Router,
    private adminService: AdministradorService
  ) {}

  togglePassword(): void {
    this.mostrarClave = !this.mostrarClave;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    // ✅ LLAMADA REAL A LA API
    this.adminService.login(this.loginData.correo, this.loginData.clave)
      .subscribe({
        next: (admin: any) => {
          // Login exitoso - redirigir al dashboard
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error: any) => {
          console.error('Error en login:', error);
          this.mensajeError = error.status === 401 
            ? 'Credenciales incorrectas. Verifica tu correo y contraseña.'
            : 'Error del servidor. Intenta nuevamente más tarde.';
          this.cargando = false;
        },
        complete: () => {
          this.cargando = false;
        }
      });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.mensajeError = '';
    this.mostrarClave = false;
  }
}