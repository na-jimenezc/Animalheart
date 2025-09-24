
import { MascotasService } from '../../../core/services/mascotas.service';


import { Mascota } from '../../../core/models/mascota.model';
import { ItemMascota } from './item-mascota/item-mascota';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mascotas',
  imports: [ItemMascota, CommonModule],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css'
})

export class Mascotas implements OnInit {
  mascotas: Mascota[] = [];

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.mascotasService.state.subscribe(lista => {
      this.mascotas = lista;
    });
  }
}
