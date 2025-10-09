import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ClienteService } from '../../../core/services/cliente.service';
import type { Cliente } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],   // <-- IMPORTANTÍSIMO para routerLink
  templateUrl: './cliente-detalle.html',
  styleUrls: ['./cliente-detalle.css']
})
export class ClienteDetalle implements OnInit {
  cliente?: Cliente;
  loading = true;
  error = '';

  /** opcional: para saber a qué mascota volver */
  fromMascotaId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id = Number(p.get('id'));
      this.fromMascotaId = Number(this.route.snapshot.queryParamMap.get('fromMascotaId') || 0) || undefined;

      if (!id) {
        this.error = 'ID no válido';
        this.loading = false;
        return;
      }
      this.cargar(id);
    });
  }

  private cargar(id: number): void {
    this.loading = true;
    this.clienteService.getClienteById(id).subscribe({
      next: cli => {
        this.cliente = cli;
        this.loading = false;
      },
      error: _ => {
        this.error = 'No se pudo cargar el dueño';
        this.loading = false;
      }
    });
  }

  editar(): void {
    if (!this.cliente?.id) return;
    // Reutiliza tu pantalla actual de edición
    this.router.navigate(['/veterinario/mascotas/editar-dueno', this.cliente.id], {
      queryParams: this.fromMascotaId ? { returnTo: `/mascotas/detalle/${this.fromMascotaId}` } : {}
    });
  }

  eliminar(): void {
    if (!this.cliente?.id) return;
    if (!confirm('¿Seguro que deseas eliminar este dueño? Esta acción no se puede deshacer.')) return;

    this.clienteService.deleteCliente(this.cliente.id).subscribe({
      next: () => {
        alert('Dueño eliminado correctamente.');
        if (this.fromMascotaId) {
          this.router.navigate(['/mascotas/detalle', this.fromMascotaId]);
        } else {
          this.router.navigate(['/mascotas/ver-mascotas']);
        }
      },
      error: () => alert('No se pudo eliminar el cliente. Intenta más tarde.')
    });
  }

  volver(): void {
    if (this.fromMascotaId) this.router.navigate(['/mascotas/detalle', this.fromMascotaId]);
    else this.router.navigate(['/mascotas/ver-mascotas']);
  }
}
