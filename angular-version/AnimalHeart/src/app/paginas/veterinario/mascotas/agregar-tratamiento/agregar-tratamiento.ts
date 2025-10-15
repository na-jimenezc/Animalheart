import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderVet } from '../../../../componentes/header-vet/header-vet';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
import { TratamientoService } from '../../../../core/services/tratamiento.service';
import { Medicamento } from '../../../../core/models/medicamento.model';
import { VeterinarioService } from '../../../../core/services/veterinario.service';
import { timeout, finalize } from 'rxjs';

function stockValidator(medicamentoSeleccionado: Medicamento | null) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!medicamentoSeleccionado || !control.value) {
      return null;
    }
    
    const cantidad = Number(control.value);
    const stockDisponible = medicamentoSeleccionado.unidadesDisponibles;
    
    if (isNaN(cantidad) || cantidad <= 0) {
      return { invalidQuantity: true };
    }
    
    if (cantidad > stockDisponible) {
      return { 
        stockInsuficiente: {
          disponible: stockDisponible,
          solicitado: cantidad
        }
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-agregar-tratamiento',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink, 
    HeaderVet
  ],
  templateUrl: './agregar-tratamiento.html',
  styleUrl: './agregar-tratamiento.css'
})
export class AgregarTratamiento implements OnInit {
  tratamientoForm: FormGroup;
  mascotas: any[] = [];
  medicamentos: any[] = [];
  medicamentoSeleccionado: any | null = null;
  veterinario: any | null = null;
  error: string | null = null;
  stockError: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    private medicamentosService: MedicamentosService,
    private tratamientoService: TratamientoService,
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {
    this.tratamientoForm = this.fb.group({
      mascotaId: [null, Validators.required],
      fecha: [null, Validators.required],
      medicamentoId: [null, Validators.required],
      cantidadUsada: [1, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)]],
      tipoTratamiento: [null, Validators.required],
      observaciones: [''],
    });
    } 

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.cargarVeterinario();

    this.tratamientoForm.get('medicamentoId')?.valueChanges.subscribe(() => {
      this.onMedicamentoChange();
    });
    this.tratamientoForm.get('cantidadUsada')?.valueChanges.subscribe(() => {
      this.validarStock();
    });
  }

  cargarVeterinario(): void {
    this.veterinario = this.veterinarioService.getVetFromStorage();
    if (!this.veterinario) {
      this.error = 'No se encontró información del veterinario. Por favor, inicie sesión nuevamente.';
    }
  }

  cargarDatosIniciales(): void {
    this.mascotasService.getAll().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas.filter(m => m.activo);
        if (this.mascotas.length === 0) {
          this.error = 'No hay mascotas activas disponibles para tratamiento.';
        }
      },
      error: (error) => {
        console.error('Error cargando mascotas:', error);
        this.error = 'Error al cargar las mascotas: ' + error.message;
      }
    });

    this.medicamentosService.getAll().subscribe({
      next: (medicamentos) => {
        this.medicamentos = medicamentos;
        if (this.medicamentos.length === 0) {
          this.error = 'No hay medicamentos disponibles.';
        }
      },
      error: (error) => {
        console.error('Error cargando medicamentos:', error);
        this.error = 'Error al cargar los medicamentos: ' + error.message;
      }
    });
  }

  onMedicamentoChange(): void {
  const raw = this.tratamientoForm.get('medicamentoId')?.value;
  const medicamentoId = Number(raw); // cast defensivo

  this.medicamentoSeleccionado =
    this.medicamentos.find(m => Number(m.id) === medicamentoId) || null;

  const cantidadControl = this.tratamientoForm.get('cantidadUsada');
  if (cantidadControl) {
    cantidadControl.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^[1-9]\d*$/),
    ]);
    cantidadControl.updateValueAndValidity();
  }
  this.validarStock();
}

validarStock(): void {
  const cantidadControl = this.tratamientoForm.get('cantidadUsada');
  const cantidad = Number(cantidadControl?.value);
  const stockDisponible = Number(this.medicamentoSeleccionado?.unidadesDisponibles ?? 0);

  if (!this.medicamentoSeleccionado || !Number.isFinite(cantidad)) {
    this.stockError = null;
    return;
  }
  this.stockError = (cantidad > stockDisponible)
    ? `Error: Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`
    : null;
}


  getStockDisponible(): number {
    return this.medicamentoSeleccionado?.unidadesDisponibles || 0;
  }

  private extractErrorMessage(err: any): string {
  if (err?.name === 'TimeoutError') return 'El servidor tardó demasiado en responder.';
  if (err?.status === 0) return 'No se pudo conectar con el servidor.';
  if (typeof err?.error?.message === 'string') return err.error.message;

  const errors = err?.error?.errors || err?.error;
  if (errors && typeof errors === 'object') {
    const list = Object.values(errors).flat().map((e: any) => String(e));
    if (list.length) return list.join(' · ');
  }
  return 'Error al guardar el tratamiento. Intente nuevamente.';
}

  onSubmit(): void {
  this.error = null;

  if (this.tratamientoForm.invalid) {
    Object.values(this.tratamientoForm.controls).forEach(c => c.markAsTouched());
    this.error = 'Por favor complete todos los campos requeridos correctamente.';
    return;
  }

  if (!this.veterinario?.id) {
    this.error = 'No se pudo identificar al veterinario. Por favor, inicie sesión nuevamente.';
    return;
  }

  const v = this.tratamientoForm.value;
  const cant = Number(v.cantidadUsada);
  const stockDisponible = this.medicamentoSeleccionado?.unidadesDisponibles ?? 0;

  if (!this.medicamentoSeleccionado) {
    this.error = 'Seleccione un medicamento.';
    return;
  }
  if (!Number.isFinite(cant) || cant <= 0) {
    this.error = 'Ingrese una cantidad válida (> 0).';
    return;
  }
  if (stockDisponible <= 0 || cant > stockDisponible) {
    this.error = `No hay suficiente stock de ${this.medicamentoSeleccionado.nombre}. ` +
                 `Stock disponible: ${stockDisponible}.`;
    return;
  }

  this.isLoading = true;

  const payload = {
    idMascota: Number(v.mascotaId),
    idMedicamento: Number(v.medicamentoId),
    idVeterinario: Number(this.veterinario.id),
    cantidadUsada: Number(v.cantidadUsada),
  };

  this.tratamientoService.administrarMedicamento(payload)
    .pipe(
      timeout(15000),
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: _ => this.router.navigate(['/mascotas/ver-mascotas']),
      error: err => this.error = this.extractErrorMessage(err),
    });
  }
}