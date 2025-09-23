import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MascotasService } from '../../core/services/mascotas.service';
import { Mascota, TipoMascota } from '../../core/models/mascota.model';

type FormData = Omit<Mascota, 'id'>;

const formData: FormData = {
  nombre: '',
  tipo: 'Perro' as TipoMascota,
  raza: '',
  edad: 0,
  enfermedad: '',
  peso: 0,
  fotoUrl: '',
  activo: true,
  clienteId: '',
};

@Component({
  selector: 'app-mascota-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="contenedor">
    <h1>{{ isEdit() ? 'Editar Mascota' : 'Nueva Mascota' }}</h1>

    <form #f="ngForm" (ngSubmit)="submit(f)">
      <div class="grid">
        <label>Nombre
          <input name="nombre" [(ngModel)]="form.nombre" required />
        </label>

        <label>Tipo
          <select name="tipo" [(ngModel)]="form.tipo" required>
            <option value="" disabled>— Selecciona —</option>
            <option>Perro</option>
            <option>Gato</option>
          </select>
        </label>

        <label>Raza
          <input name="raza" [(ngModel)]="form.raza" required />
        </label>

        <label>Edad (años)
          <input type="number" name="edad" [(ngModel)]="form.edad" min="0" required />
        </label>

        <label>Peso (kg)
          <input type="number" step="0.1" name="peso" [(ngModel)]="form.peso" min="0" required />
        </label>

        <label>Enfermedad
          <input name="enfermedad" [(ngModel)]="form.enfermedad" />
        </label>

        <label>Foto (URL)
          <input name="fotoUrl" [(ngModel)]="form.fotoUrl" />
        </label>

        <label>Activo
          <input type="checkbox" name="activo" [(ngModel)]="form.activo" />
        </label>

        <label>Cliente ID
          <input name="clienteId" [(ngModel)]="form.clienteId" />
        </label>
      </div>

      <div class="acciones">
        <button class="btn primary" type="submit" [disabled]="f.invalid">
          {{ isEdit() ? 'Guardar cambios' : 'Crear mascota' }}
        </button>
        <a class="btn" [routerLink]="['/mascotas']">Cancelar</a>
      </div>
    </form>
  </div>
  `,
  styles: [`
    .contenedor{max-width:780px;margin:32px auto;padding:0 16px}
    form{background:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 22px rgba(20,20,43,.06)}
    .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    label{display:flex;flex-direction:column;gap:6px;font-weight:600;color:#334155}
    input,select{padding:.6rem .8rem;border-radius:12px;border:1px solid #d0d5dd}
    .acciones{display:flex;gap:10px;justify-content:flex-end;margin-top:12px}
    .btn{padding:.6rem 1rem;border-radius:10px;border:1px solid transparent;cursor:pointer;text-decoration:none}
    .primary{background:#0a66c2;color:#fff;border-color:#0a66c2}
  `],
})
export class MascotaFormPage {
  private svc = inject(MascotasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = signal<boolean>(false);
  idEdicion: string | null = null;

  form: FormData = { ...formData };

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const m = this.svc.findById(id);
      if (m) {
        this.isEdit.set(true);
        this.idEdicion = id;
        const { id: _, ...rest } = m;
        this.form = { ...rest };
      }
    }
  }

  submit(f: NgForm) {
    if (f.invalid) return;

    if (this.isEdit()) {
      this.svc.update(this.idEdicion!, this.form);
    } else {
      this.svc.create(this.form);
    }
    this.router.navigate(['/mascotas']);
  }
}
