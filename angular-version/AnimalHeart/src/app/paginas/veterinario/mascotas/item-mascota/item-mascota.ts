
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mascota } from '../../../../core/models/mascota.model';
import { RouterModule } from '@angular/router'; 
import { MascotasService } from '../../../../core/services/mascotas.service';

@Component({
  selector: 'tr[app-item-mascota]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-mascota.html',
  styleUrls: ['./item-mascota.css']
})
export class ItemMascota {
  @Input() mascota!: Mascota;

  constructor(private mascotasService: MascotasService) {}

  desactivar(): void {
    if (this.mascota.id && this.mascota.activo) {
      if (confirm(`¿Estás seguro de que quieres desactivar a ${this.mascota.nombre}?`)) {
        this.mascotasService.desactivar(this.mascota.id).subscribe({
          next: () => {
            this.mascota.activo = false;
            console.log('Mascota desactivada desde item:', this.mascota.nombre);
          },
          error: (err) => console.error('Error desactivando mascota', err),
        });
      }
    }
  }
}