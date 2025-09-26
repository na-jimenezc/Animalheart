import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { VeterinarioService } from '../../core/services/veterinario.service';
import { Veterinario } from '../../core/models/veterinario.model';

type LoginVet = { usuario: string; contrasena: string };

@Component({
  selector: 'app-login-veterinario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-veterinario.html',
  styleUrl: './login-veterinario.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginVeterinario {
  loginData: LoginVet = { usuario: '', contrasena: '' };
  mostrarClave = false;
  cargando = false;
  mensajeError = '';

  constructor(private vetService: VeterinarioService, private router: Router) {}

  //Vaina visual para mostrar o esconder la clave
  togglePassword(): void {
    this.mostrarClave = !this.mostrarClave;
  }

    //Para manejar el formulario
    onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.vetService.login(this.loginData.usuario, this.loginData.contrasena).subscribe({
      next: (veterinario: Veterinario | null) => {
        if (!veterinario) {
          this.mensajeError = 'Credenciales inválidas';
          this.cargando = false;
          return;
        }

        //Se guarda el veterinario logeado en el servicio
        this.vetService.setVeterinarioLogeado(veterinario);

        //Se redirige a la página de mascotas si el login es exitoso (las credenciales son válidas)
        this.router.navigate(['/mascotas/ver-mascotas']);
      },
      error: (err) => {
        console.error('Error en login', err);
        this.mensajeError = 'Servidor no disponible. Intenta más tarde.';
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      },
    });
  }

  //Reseteo de formulario
  resetForm(form: NgForm) {
    form.resetForm();
    this.mensajeError = '';
    this.mostrarClave = false;
  }

  /*async onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    try {
      await new Promise(r => setTimeout(r, 200));

      const veterinario = this.vetService.validarCredenciales(
        this.loginData.usuario,
        this.loginData.contrasena
      );

      if (!veterinario) throw new Error('Credenciales inválidas');

      //Se redirige a la página de mascotas si el login es exitoso (las credenciales son válidas)
      this.router.navigate(['/mascotas/ver-mascotas']);
    } catch {
      this.mensajeError = 'Credenciales inválidas o servidor no disponible.';
    } finally {
      this.cargando = false;
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.mensajeError = '';
    this.mostrarClave = false;
  }*/
}