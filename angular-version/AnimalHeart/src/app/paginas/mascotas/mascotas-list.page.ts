import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MascotasService } from '../../core/services/mascotas.service';
import { Mascota } from '../../core/models/mascota.model';

@Component({
  selector: 'app-mascotas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
  <div class="contenedor">
    <header class="header">
      <h1>Mascotas</h1>
      <a class="btn primary" [routerLink]="['/mascotas/nuevo']">Añadir mascota</a>
    </header>

    <div class="toolbar">
      <input [(ngModel)]="q" type="search" placeholder="Buscar por nombre, tipo o raza" />
    </div>

    <table class="tabla">
      <thead>
        <tr>
          <th>Foto</th><th>Nombre</th><th>Tipo</th><th>Raza</th>
          <th>Edad</th><th>Peso</th><th>Activo</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let m of filtradas()">
          <td><img [src]="m.fotoUrl" alt="" class="foto"></td>
          <td>{{ m.nombre }}</td>
          <td>{{ m.tipo }}</td>
          <td>{{ m.raza }}</td>
          <td>{{ m.edad }}</td>
          <td>{{ m.peso | number:'1.0-1' }} kg</td>
          <td><span class="pill" [class.ok]="m.activo">{{ m.activo ? 'Sí' : 'No' }}</span></td>
          <td class="acciones">
            <a [routerLink]="['/mascotas', m.id]">Ver</a>
            <a [routerLink]="['/mascotas', m.id, 'editar']">Editar</a>
            <button class="danger" (click)="delete(m)">Eliminar</button>
          </td>
        </tr>
        <tr *ngIf="filtradas().length === 0">
          <td colspan="8" class="vacio">No hay coincidencias</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: [`
    .contenedor{max-width:1000px;margin:32px auto;padding:0 16px}
    .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
    .btn{display:inline-block;padding:.6rem 1rem;border-radius:10px;border:1px solid transparent}
    .primary{background:#2b7;color:#fff}
    .toolbar{margin:12px 0}
    input[type="search"]{width:100%;padding:.6rem .8rem;border-radius:12px;border:1px solid #d0d5dd}
    .tabla{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 22px rgba(20,20,43,.06)}
    th,td{padding:12px 14px;border-bottom:1px solid #eef1f4;text-align:left}
    .foto{width:42px;height:42px;object-fit:cover;border-radius:10px;border:1px solid #e5e7eb}
    .acciones{display:flex;gap:10px;align-items:center}
    a{color:#0a66c2}
    .danger{background:#fee2e2;color:#b91c1c;border-color:#fecaca}
    .pill{display:inline-block;padding:.1rem .5rem;border-radius:999px;background:#eef2ff;color:#3730a3}
    .pill.ok{background:#dcfce7;color:#166534}
    .vacio{color:#64748b;text-align:center}
  `],
})
export class MascotasListPage {
  private svc = inject(MascotasService);
  private router = inject(Router);

  q = '';
  mascotas = signal<Mascota[]>(this.svc.list());

  constructor() {
    this.svc.state.subscribe(list => this.mascotas.set(list));
  }

  filtradas = computed(() => {
    const q = this.q.trim().toLowerCase();
    if (!q) return this.mascotas();
    return this.mascotas().filter(m =>
      [m.nombre, m.tipo, m.raza].some(v => (v ?? '').toLowerCase().includes(q))
    );
  });

  delete(m: Mascota) {
    if (confirm(`¿Eliminar a "${m.nombre}"?`)) {
      this.svc.delete(m.id);
    }
  }
}
