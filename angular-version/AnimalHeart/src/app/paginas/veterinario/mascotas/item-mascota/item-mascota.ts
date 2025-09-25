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
    if (this.mascota.activo) {
      this.mascotasService.desactivar(this.mascota.id);
    }
  }
  
}
