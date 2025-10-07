import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Mascota } from '../../../../core/models/mascota.model';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { TratamientoService } from '../../../../core/services/tratamiento.service';
import { TratamientoDTO } from '../../../../core/models/DTO/tratamiento-dto';
import { HeaderVet } from '../../../../componentes/header-vet/header-vet';
import { VeterinarioService } from '../../../../core/services/veterinario.service';
import { Veterinario } from '../../../../core/models/veterinario.model';
import { ClienteService } from '../../../../core/services/cliente.service';

@Component({
  selector: 'app-mascota-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderVet],
  templateUrl: './mascota-detalle.html',
  styleUrls: ['./mascota-detalle.css']
})
export class MascotaDetalle implements OnInit {

  mascota?: Mascota;
  tratamientos: TratamientoDTO[] = [];
  defaultImage = '/assets/images/imagenError.webp';

  loading = true;
  error = false;
  loadingTratamientos = false;

  veterinario: Veterinario | null = null;
  headerError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotasService: MascotasService,
    private tratamientoService: TratamientoService,
    private cdr: ChangeDetectorRef,
    private veterinarioService: VeterinarioService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarVeterinario();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarMascota(+id);
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private cargarVeterinario(): void {
    this.veterinario = this.veterinarioService.getVetFromStorage();
    if (!this.veterinario) {
      this.headerError = 'No se encontró información del veterinario. Por favor, inicie sesión nuevamente.';
    }
  }

  cargarMascota(id: number): void {
  this.loading = true;
  this.error = false;
  this.mascota = undefined;
  this.tratamientos = [];

  this.mascotasService.getById(id).subscribe({
    next: (data) => {
      this.mascota = data;
      this.loading = false;

      const cid =
        this.mascota?.cliente?.id ??
        (this.mascota as any)?.clienteId ??
        (this.mascota as any)?.cliente_id ??
        (this.mascota as any)?.owner?.id ??
        (this.mascota as any)?.owner_id;

      if (!this.mascota?.cliente && cid) {
        this.clienteService.getClienteById(cid).subscribe({
          next: (cli) => {
            if (this.mascota) this.mascota.cliente = cli;
            this.cdr.detectChanges();
          },
          error: (e) => {
            console.warn('No se pudo cargar el dueño por id', cid, e);
          }
        });
      }

      if (this.mascota?.id) {
        this.cargarTratamientos(this.mascota.id);
      }
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error cargando mascota', err);
      this.loading = false;
      this.error = true;
      this.cdr.detectChanges();
    }
  });
}

  cargarTratamientos(mascotaId: number): void {
    this.loadingTratamientos = true;

    this.tratamientoService.getTratamientosPorMascota(mascotaId).subscribe({
      next: (tratamientos) => {
        this.tratamientos = tratamientos;
        this.loadingTratamientos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando tratamientos:', err);
        this.tratamientos = [];
        this.loadingTratamientos = false;
        this.cdr.detectChanges();
      }
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'Fecha no disponible';
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return fecha;
    }
  }

  editarDueno(clienteId?: number): void {
    if (!clienteId) return;
    this.router.navigate(['/veterinario/mascotas/editar-dueno', clienteId]);
  }

  eliminarDueno(clienteId?: number): void {
    if (!clienteId) return;
    const ok = confirm('¿Seguro que deseas eliminar este cliente? Esta acción no se puede deshacer.');
    if (!ok) return;

    this.clienteService.deleteCliente(clienteId).subscribe({
      next: () => {
        if (this.mascota) this.mascota.cliente = null;
        alert('Cliente eliminado correctamente.');
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error eliminando cliente', err);
        alert('No se pudo eliminar el cliente. Intenta más tarde.');
      }
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}