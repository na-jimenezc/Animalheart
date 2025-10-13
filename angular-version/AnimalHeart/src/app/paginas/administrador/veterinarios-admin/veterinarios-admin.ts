// veterinarios-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { Veterinario } from '../../../core/models/veterinario.model';

@Component({
  selector: 'app-veterinarios-admin',
  imports: [CommonModule],
  templateUrl: './veterinarios-admin.html',
  styleUrl: './veterinarios-admin.css'
})
export class VeterinariosAdminComponent implements OnInit {
  veterinarios: Veterinario[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVeterinarios();
  }

  cargarVeterinarios(): void {
    this.loading = true;
    this.veterinarioService.getActivos().subscribe({
      next: (vets) => {
        this.veterinarios = vets;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los veterinarios';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/admin/veterinarios', id]);
  }
}