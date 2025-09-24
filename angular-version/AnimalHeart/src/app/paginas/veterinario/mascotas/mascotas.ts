
import { MascotasService } from '../../../core/services/mascotas.service';
import { VeterinarioService } from '../../../core/services/veterinario.service';


import { Mascota } from '../../../core/models/mascota.model';
import { ItemMascota } from './item-mascota/item-mascota';
import { Veterinario } from '../../../core/models/veterinario.model';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HeaderVet } from '../../../componentes/header-vet/header-vet';

@Component({
  selector: 'app-mascotas',
  imports: [ItemMascota, CommonModule, HeaderVet],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css'
})

export class Mascotas implements OnInit {
  mascotas: Mascota[] = [];
  veterinario: Veterinario | null = null;

  constructor(private mascotasService: MascotasService, private veterinarioService: VeterinarioService) {}

  ngOnInit(): void {
    //Consumir a las mascotas
    this.mascotasService.state.subscribe(lista => {
      this.mascotas = lista;
    });

    //Consumir al veterinario actual
    this.veterinarioService.veterinario$.subscribe(vet => {
      this.veterinario = vet;
    });
  }
}
