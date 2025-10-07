import { MascotasService } from '../../../core/services/mascotas.service';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { Mascota } from '../../../core/models/mascota.model';
import { ItemMascota } from './item-mascota/item-mascota';
import { Veterinario } from '../../../core/models/veterinario.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeaderVet } from '../../../componentes/header-vet/header-vet';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  imports: [ItemMascota, CommonModule, HeaderVet, RouterModule],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css'
})
export class Mascotas implements OnInit {
  todasLasMascotas: Mascota[] = [];
  mascotas: Mascota[] = [];
  veterinario: Veterinario | null = null;

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
        this.totalElements = mascotas.length;
        this.totalPages = Math.ceil(mascotas.length / this.size);
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
    this.mascotas = this.todasLasMascotas.slice(startIndex, endIndex);
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
    if (mascota.id && mascota.activo) {
      if (confirm(`¿Estás seguro de que quieres desactivar a ${mascota.nombre}?`)) {
        this.mascotasService.desactivar(mascota.id).subscribe({
          next: () => {
            mascota.activo = false;
            console.log('Mascota desactivada:', mascota.nombre);
          },
          error: (err) => console.error('Error desactivando mascota', err),
        });
      }
    }
  }
}