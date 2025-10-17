import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { VeterinarioService } from '../../core/services/veterinario.service';
import { Veterinario } from '../../core/models/veterinario.model';

type LoginVet = { usuario: string; contrasena: string };

@Component({
  selector: 'app-login-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-veterinario.html',
  styleUrls: ['./login-veterinario.css'],
})
export class LoginVeterinario {
  loginData: LoginVet = { usuario: '', contrasena: '' };
  mostrarClave = false;
  cargando = false;
  mensajeError = '';

  constructor(
    private vetService: VeterinarioService,
    private router: Router,
    private cdRef: ChangeDetectorRef
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
    this.cdRef.detectChanges(); 

    this.vetService
      .login(this.loginData.usuario, this.loginData.contrasena)
      .subscribe({
        next: (vet: Veterinario | null) => {
          this.cargando = false;
          if (!vet) {
            //Caso de credenciales inválidas
            this.mensajeError = 'Credenciales inválidas';
          } else {
            //Caso de éxito y seteo de variables
            this.vetService.setVeterinarioLogeado(vet);
            this.router.navigate(['/mascotas/ver-mascotas']);
          }
          this.cdRef.detectChanges(); 
        },
         //Caso de errores según lo definido
        error: (err) => {
          this.cargando = false;
          console.error('Error en login veterinario:', err);
          
          if (err?.status === 401) {
            this.mensajeError = 'Credenciales inválidas';
          } else if (err?.status === 403) {
            this.mensajeError = 'Tu cuenta está inactiva. Comunícate con el administrador para activarla.';
          } else if (err?.status === 0) {
            this.mensajeError = 'Error de conexión. Verifica tu conexión a internet.';
          } else {
            this.mensajeError = 'Servidor no disponible. Intenta más tarde.';
          }
          this.cdRef.detectChanges(); 
        }
      });
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.loginData = { usuario: '', contrasena: '' };
    this.mensajeError = '';
    this.mostrarClave = false;
    this.cdRef.detectChanges();
  }
}