import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MascotasService } from '../../core/services/mascotas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="contenedor" *ngIf="vm">
    <a class="back" [routerLink]="['/mascotas']">← Volver</a>

    <div class="card">
      <img [src]="vm.fotoUrl" class="foto" alt="">
      <div class="info">
        <h1>{{ vm.nombre }}</h1>
        <p><b>Tipo:</b> {{ vm.tipo }} — <b>Raza:</b> {{ vm.raza }}</p>
        <p><b>Edad:</b> {{ vm.edad }} años — <b>Peso:</b> {{ vm.peso | number:'1.0-1' }} kg</p>
        <p><b>Enfermedad:</b> {{ vm.enfermedad || 'Ninguna' }}</p>
        <p><b>Cliente ID:</b> {{ vm.clienteId || '—' }}</p>
        <p class="estado" [class.ok]="vm.activo">Estado: {{ vm.activo ? 'Activo' : 'Inactivo' }}</p>

        <div class="acciones">
          <a class="btn" [routerLink]="['/mascotas', vm.id, 'editar']">Editar</a>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .contenedor{max-width:900px;margin:32px auto;padding:0 16px}
    .back{display:inline-block;margin-bottom:10px;color:#0a66c2}
    .card{display:flex;gap:18px;background:#fff;border-radius:16px;padding:16px;box-shadow:0 8px 22px rgba(20,20,43,.06)}
    .foto{width:160px;height:160px;object-fit:cover;border-radius:12px;border:1px solid #e5e7eb}
    .info h1{margin:.2rem 0 0.4rem}
    .estado{margin-top:10px}
    .estado.ok{color:#166534}
    .acciones{margin-top:12px}
    .btn{padding:.6rem 1rem;border-radius:10px;border:1px solid #d0d5dd;background:#fff;text-decoration:none}
  `]
})
export class MascotaDetallePage {
  private svc = inject(MascotasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  vm = this.svc.getById(this.route.snapshot.paramMap.get('id') || '') ?? null;

  constructor() {
    if (!this.vm) this.router.navigate(['/mascotas']);
  }
}
