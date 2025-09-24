import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasService } from '../../../core/services/mascotas.service';
import { Mascota } from '../../../core/models/mascota.model';
import { ItemMascota } from './item-mascota/item-mascota';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, ItemMascota],
  templateUrl: './mascotas.html',
  styleUrls: ['./mascotas.css']
})
export class Mascotas implements OnInit {
  mascotas: Mascota[] = [];

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.mascotas = this.mascotasService.list();
  }
}
