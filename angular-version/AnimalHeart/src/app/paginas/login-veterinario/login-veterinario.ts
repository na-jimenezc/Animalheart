import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { VeterinarioService } from '../../core/services/veterinario.service';
import { Veterinario } from '../../core/models/veterinario.model';

type LoginVet = { usuario: string; contrasena: string };

@Component({
  selector: 'app-login-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-veterinario.html',
  styleUrls: ['./login-veterinario.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginVeterinario {
  loginData: LoginVet = { usuario: '', contrasena: '' };
  mostrarClave = false;
  cargando = false;
  mensajeError = '';

  constructor(
    private vetService: VeterinarioService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.mostrarClave = !this.mostrarClave;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.vetService
      .login(this.loginData.usuario, this.loginData.contrasena)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (vet: Veterinario | null) => {
          if (!vet) {
            this.mensajeError = 'Credenciales inválidas';
            return;
          }
          this.vetService.setVeterinarioLogeado(vet);
          this.router.navigate(['/mascotas/ver-mascotas']);
        },
        error: (err) => {
          console.error('Error en login veterinario:', err);
          this.mensajeError =
            err?.status === 401
              ? 'Credenciales inválidas'
              : 'Servidor no disponible. Intenta más tarde.';
        },
      });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.mensajeError = '';
    this.mostrarClave = false;
  }
}