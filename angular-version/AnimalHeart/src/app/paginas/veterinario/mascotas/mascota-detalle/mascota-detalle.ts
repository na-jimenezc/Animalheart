
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '../../../../core/models/mascota.model';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascota-detalle',
  imports: [CommonModule],
  templateUrl: './mascota-detalle.html',
  styleUrl: './mascota-detalle.css'
})
export class MascotaDetalle implements OnInit {
  
  mascota?: Mascota;

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    if (id) {
      this.mascotasService.findById(id).subscribe({
        next: (data) => (this.mascota = data),
        error: (err) => console.error('Error cargando mascota', err)
      });
    }
  }
}