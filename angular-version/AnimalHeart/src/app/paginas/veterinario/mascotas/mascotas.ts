
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

  //Lista de mascotas  y del veterinario
  mascotas: Mascota[] = [];
  veterinario: Veterinario | null = null;

  page = 1; //página actual
  size = 5; //max de visualización
  total = 0; //páginas totales

  cargando = false;

  //Inyección de dependencias
  constructor(
    private mascotasService: MascotasService,
    private veterinarioService: VeterinarioService
  ) {}

  //Al iniciar el componente, se cargan las mascotas y se obtiene el veterinario logeado
  ngOnInit(): void {
    this.cargarMascotas();
    this.veterinarioService.veterinario$.subscribe(vet => this.veterinario = vet);
  }

  cargarMascotas(): void {
    this.cargando = true;
    this.mascotasService.getPaginated(this.page - 1, this.size).subscribe({
      next: res => {
        this.mascotas = res.content;       
        this.total = res.totalElements;     
        this.cargando = false;  
      },
      error: err => {
        console.error('Error cargando mascotas', err);
        this.cargando = false;
      }
    });
  }

  cambiarPagina(delta: number): void {
    this.page += delta;
    if (this.page < 1) this.page = 1;
    this.cargarMascotas();
  }

  siguiente(): void {
    if (this.page * this.size < this.total) {
      this.page++;
      this.cargarMascotas();
    }
  }

  anterior(): void {
    if (this.page > 1) {
      this.page--;
      this.cargarMascotas();
    }
  }
}
