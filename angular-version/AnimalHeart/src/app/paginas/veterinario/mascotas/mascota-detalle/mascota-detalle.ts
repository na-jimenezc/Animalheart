import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../../../../core/models/mascota.model';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mascota-detalle',
  imports: [CommonModule],
  templateUrl: './mascota-detalle.html',
  styleUrls: ['./mascota-detalle.css']
})
export class MascotaDetalle implements OnInit {
  
  mascota?: Mascota;
  defaultImage = "/assets/images/imagenError.webp";
  loading = true;
  error = false;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotasService: MascotasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Componente MascotaDetalle inicializado');
    
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Parámetro de ruta cambiado, ID:', id);
      
      if (id) {
        this.cargarMascota(+id);
      } else {
        console.error('No se encontró ID en la ruta');
        this.error = true;
        this.loading = false;
      }
    });

    // También carga la mascota inicial con snapshot
    const initialId = this.route.snapshot.paramMap.get('id');
    if (initialId) {
      console.log('Cargando mascota inicial con ID:', initialId);
      this.cargarMascota(+initialId);
    }
  }

  ngOnDestroy(): void {
    console.log('Componente destruido');
    this.routeSub?.unsubscribe(); 
  }

  cargarMascota(id: number): void {
      this.loading = true;
      this.error = false;
      this.mascota = undefined;

      this.mascotasService.getById(id).subscribe({
        next: (data) => {
          console.log('Mascota recibida:', data);
          this.mascota = data;
          this.loading = false;
          this.error = false;
          this.cdr.detectChanges();  
        },
        error: (err) => {
          console.error('Error cargando mascota', err);
          this.loading = false;
          this.error = true;
          this.mascota = undefined;
          this.cdr.detectChanges();   
        }
      });
    }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

}