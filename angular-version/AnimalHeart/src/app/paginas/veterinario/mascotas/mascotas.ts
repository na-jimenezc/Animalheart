import { MascotasService } from '../../../core/services/mascotas.service';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { Mascota } from '../../../core/models/mascota.model';
import { Veterinario } from '../../../core/models/veterinario.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeaderVet } from '../../../componentes/header-vet/header-vet';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, HeaderVet, RouterModule, FormsModule],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css'
})
export class Mascotas implements OnInit {
  todasLasMascotas: Mascota[] = [];
  mascotas: Mascota[] = [];
  veterinario: Veterinario | null = null;
  terminoBusqueda: string = '';
  mascotasFiltradas: Mascota[] = [];

  page = 1;
  size = 5;
  totalElements = 0;
  totalPages = 0;
  cargando = false;

  constructor(
    private mascotasService: MascotasService,
    private veterinarioService: VeterinarioService,
    private changeDetector: ChangeDetectorRef
  ) {}

  procesando = false;
  desactivandoId: number | null = null;

  ngOnInit(): void {
    this.cargarTodasLasMascotas();
    this.veterinarioService.veterinario$.subscribe(vet => {
      this.veterinario = vet;
      this.changeDetector.detectChanges(); 
    });
  }

  cargarTodasLasMascotas(): void {
    this.cargando = true;
    this.changeDetector.detectChanges(); 
    
    this.mascotasService.getAll().subscribe({
      next: (mascotas: Mascota[]) => {
        this.todasLasMascotas = mascotas;
        this.mascotasFiltradas = [...this.todasLasMascotas];
        this.totalElements = mascotas.length;
        this.totalPages = Math.ceil(mascotas.length / this.size);
        this.page = 1;
        this.actualizarPagina();
        this.cargando = false;
        this.changeDetector.detectChanges(); 
        console.log('Datos cargados y cambio detectado');
      },
      error: err => {
        console.error('Error cargando mascotas', err);
        this.cargando = false;
        this.changeDetector.detectChanges(); 
      }
    });
  }

  actualizarPagina(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.mascotas = this.mascotasFiltradas.slice(startIndex, endIndex);
    this.changeDetector.detectChanges();
  }

  cambiarPagina(nuevaPagina: number): void {
    this.page = nuevaPagina;
    this.actualizarPagina();
  }

  siguiente(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.actualizarPagina();
    }
  }

  anterior(): void {
    if (this.page > 1) {
      this.page--;
      this.actualizarPagina();
    }
  }

  desactivarMascota(mascota: Mascota): void {
    if (!mascota?.id || !mascota.activo) { return; }
    if (!confirm(`¿Estás seguro de que quieres desactivar a ${mascota.nombre}?`)) { return; }

    if (this.procesando && this.desactivandoId === mascota.id) { return; }

    this.procesando = true;
    this.desactivandoId = mascota.id;

    const previo = mascota.activo;
    mascota.activo = false;
    this.changeDetector.detectChanges();

    this.mascotasService.desactivar(mascota.id).pipe(
      take(1),
      finalize(() => {
        this.procesando = false;
        this.desactivandoId = null;
        this.changeDetector.detectChanges();
      })
    ).subscribe({
      next: () => {
      },
      error: (err) => {
        mascota.activo = previo;
        console.error('Error desactivando mascota', err);
      }
    });
  }

  buscarMascotas(): void {
    const t = (this.terminoBusqueda || '').trim().toLowerCase();

    if (!t) {
      this.mascotasFiltradas = [...this.todasLasMascotas];
    } else {
      this.mascotasFiltradas = this.todasLasMascotas.filter(m =>
        (m.nombre ?? '').toLowerCase().includes(t)
      );
    }

    this.totalElements = this.mascotasFiltradas.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalElements / this.size));
    this.page = 1;

    this.actualizarPagina();
  }
}