import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import type { Cliente } from '../../../core/models/cliente.model';
import type { Mascota } from '../../../core/models/mascota.model';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-mascotas.html',
  styleUrls: ['./mis-mascotas.css']
})
export class MisMascotas implements OnInit {
  loading = true;
  error = '';
  cliente: Cliente | null = null;
  mascotas: Mascota[] = [];

  constructor(private clienteSrv: ClienteService, private router: Router) {}

  ngOnInit(): void {
    const raw = sessionStorage.getItem('cliente');
    this.cliente = raw ? (JSON.parse(raw) as Cliente) : null;

    if (!this.cliente?.id) {
      this.router.navigate(['/clientes/login-cliente']);
      return;
    }

    this.clienteSrv.getMascotasByCliente(this.cliente.id).subscribe({
      next: (list) => {
        this.mascotas = Array.isArray(list) ? list : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando mascotas del cliente:', err);
        this.error = 'No pudimos cargar tus mascotas. Intenta nuevamente.';
        this.loading = false; // <- importante para salir del "Cargando..."
      }
    });
  }

  logout(): void {
    sessionStorage.removeItem('cliente');
    this.router.navigate(['/clientes/login-cliente']);
  }
}