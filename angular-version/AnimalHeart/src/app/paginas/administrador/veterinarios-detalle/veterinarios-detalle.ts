// veterinarios-detalle.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { Veterinario } from '../../../core/models/veterinario.model';

@Component({
  selector: 'app-veterinarios-detalle',
  imports: [CommonModule],
  templateUrl: './veterinarios-detalle.html',
  styleUrl: './veterinarios-detalle.css'
})
export class VeterinariosDetalleComponent implements OnInit {
  veterinario: Veterinario | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarVeterinario(Number(id));
    } else {
      this.error = 'ID de veterinario no válido';
      this.loading = false;
    }
  }

  private cargarVeterinario(id: number): void {
    this.loading = true;
    this.veterinarioService.getById(id).subscribe({
      next: (vet) => {
        this.veterinario = vet;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del veterinario';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  volverLista(): void {
    this.router.navigate(['/admin/veterinarios']);
  }
}