
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascota = this.mascotasService.findById(id);
    }
  }
}