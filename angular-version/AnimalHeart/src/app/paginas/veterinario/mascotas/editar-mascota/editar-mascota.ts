import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MascotasService } from '../../../../core/services/mascotas.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Mascota } from '../../../../core/models/mascota.model';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-editar-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-mascota.html',
  styleUrl: './editar-mascota.css',
})
export class EditarMascota implements OnInit {
  form!: FormGroup;
  clientes: Cliente[] = [];

  submitted = false;
  cargando = false;
  successMessage = '';
  errorMessage = '';

  private id!: string;
  mascotaActual?: Mascota;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mascotasService: MascotasService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.clientes = this.clienteService.obtenerTodos();

    this.form = this.fb.group({
    fotoUrl: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    tipo:   ['', Validators.required],
    raza:   [''],
    edad:   [1, [Validators.required, Validators.min(0)]],
    enfermedad: ['Ninguna'],
    peso:   [1, [Validators.required, Validators.min(0.1), Validators.max(100)]],
    clienteId: [''],
    activo: [true],
  });


    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.id) { this.errorMessage = 'Id de mascota no válido.'; return; }

    const m = this.mascotasService.findById(this.id);
    if (!m) { this.errorMessage = 'La mascota no existe.'; return; }
    this.mascotaActual = m;

    this.form.patchValue({
      fotoUrl: m.fotoUrl ?? '',
      nombre: m.nombre,
      tipo: m.tipo,
      raza: m.raza,
      edad: m.edad,
      enfermedad: m.enfermedad,
      peso: m.peso,
      clienteId: m.cliente?.id ?? '',
      activo: m.activo,
    });

    if (!this.form.get('clienteId')?.value && m.cliente?.id) {
      this.form.get('clienteId')?.setValue(m.cliente.id);
    }
  }

  get f() { return this.form.controls; }

  onTipoChange(): void {
    const tipo = this.form.get('tipo')?.value as 'Perro' | 'Gato' | '';
    const fotoCtrl = this.form.get('fotoUrl');
    if (tipo && !fotoCtrl?.value) {
      const def = tipo === 'Perro'
        ? '/assets/images/defaultPerro.jpg'
        : '/assets/images/defaultGato.png';
      fotoCtrl?.setValue(def);
    }
  }

  onFotoUrlChange(): void {
  }

  onImageError(): void {
    this.form.patchValue({ fotoUrl: '' });
  }

  async onSubmit(): Promise<void> {
  this.submitted = true;
  this.successMessage = '';
  this.errorMessage = '';

  if (this.form.invalid || !this.mascotaActual) {
    this.form.markAllAsTouched();
    return;
  }
  if (this.cargando) return;

  this.cargando = true;
  try {
    const raw = this.form.value as {
      fotoUrl?: string; nombre: string; tipo: 'Perro'|'Gato';
      raza: string; edad: number; enfermedad?: string; peso: number;
      clienteId?: string; activo: boolean;
    };

    const selectedId = (raw.clienteId ?? '').trim();
    const cliente = selectedId
      ? this.clienteService.obtenerPorId(selectedId)
      : this.mascotaActual.cliente ?? null;

    if (!cliente) {
      this.errorMessage = 'Debes seleccionar un cliente válido.';
      return;
    }

    if (!raw.fotoUrl && raw.tipo) {
      raw.fotoUrl = raw.tipo === 'Perro'
        ? '/assets/images/defaultPerro.jpg'
        : '/assets/images/defaultGato.png';
    }

    const changes: Partial<Mascota> = {
      fotoUrl: raw.fotoUrl,
      nombre: raw.nombre,
      tipo: raw.tipo,
      raza: raw.raza,
      edad: raw.edad,
      enfermedad: raw.enfermedad,
      peso: raw.peso,
      cliente,
      activo: raw.activo,
    };

    this.mascotasService.update(this.id, changes);
    this.successMessage = 'Mascota actualizada correctamente';
    setTimeout(() => this.router.navigate(['/mascotas/ver-mascotas']), 1000);
  } catch (e) {
    this.errorMessage = 'Error al actualizar la mascota: ' + (e as Error).message;
  } finally {
    this.cargando = false;
  }
}

  onCancel(): void {
    this.router.navigate(['/mascotas/ver-mascotas']);
  }
}
