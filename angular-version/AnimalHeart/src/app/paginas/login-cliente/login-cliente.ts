import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ClienteService } from '../../core/services/cliente.service';
import type { Cliente } from '../../core/models/cliente.model';

type LoginClienteData = { correo: string; clave: string };

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-cliente.html',
  styleUrls: ['./login-cliente.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCliente {
  data: LoginClienteData = { correo: '', clave: '' };
  mostrar = false;
  cargando = false;
  error = '';

  constructor(private clienteSrv: ClienteService, private router: Router) {}

  toggle() { this.mostrar = !this.mostrar; }

  onSubmit(form: NgForm): void {
  this.cargando = true;
  this.error = '';

  this.clienteSrv.loginCliente(this.data.correo, this.data.clave).subscribe({
  next: (cliente: Cliente) => {
    sessionStorage.setItem('cliente', JSON.stringify(cliente));
    this.router.navigate(['/clientes/mis-mascotas']);
  },
  error: (err) => {
      console.error('Error en login cliente:', err);
      this.error = err?.status === 401
        ? 'Credenciales inválidas.'
        : 'Servidor no disponible. Intenta más tarde.';
      this.cargando = false;
    },
    complete: () => (this.cargando = false),
  });
}

  reset(form: NgForm) {
    form.resetForm();
    this.error = '';
    this.mostrar = false;
  }
}