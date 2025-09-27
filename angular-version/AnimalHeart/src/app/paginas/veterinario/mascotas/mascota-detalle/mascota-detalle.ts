import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../../../../core/models/mascota.model';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TratamientoService } from '../../../../core/services/tratamiento.service';
import { ChangeDetectorRef } from '@angular/core';
import { Tratamiento } from '../../../../core/models/tratamiento.model';
import { TratamientoDTO } from '../../../../core/models/DTO/tratamiento-dto';

@Component({
  selector: 'app-mascota-detalle',
  imports: [CommonModule],
  templateUrl: './mascota-detalle.html',
  styleUrls: ['./mascota-detalle.css']
})
export class MascotaDetalle implements OnInit {
  
  mascota?: Mascota;
  tratamientos: TratamientoDTO[] = []; 
  defaultImage = "/assets/images/imagenError.webp";
  loading = true;
  error = false;
  loadingTratamientos = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotasService: MascotasService,
    private tratamientoService: TratamientoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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

  cargarMascota(id: number): void {
    this.loading = true;
    this.error = false;
    this.mascota = undefined;
    this.tratamientos = [];

    this.mascotasService.getById(id).subscribe({
      next: (data) => {
        this.mascota = data;
        this.loading = false;
        this.error = false;
        
        if (this.mascota.id) {
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
        console.log('Tratamientos recibidos:', tratamientos);
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
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return fecha;
    }
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}

