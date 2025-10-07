import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderVet } from '../../../../componentes/header-vet/header-vet';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { MedicamentosService } from '../../../../core/services/medicamentos.service';
import { TratamientoService } from '../../../../core/services/tratamiento.service';
import { Mascota } from '../../../../core/models/mascota.model';
import { Medicamento } from '../../../../core/models/medicamento.model';
import { VeterinarioService } from '../../../../core/services/veterinario.service';
import { Veterinario } from '../../../../core/models/veterinario.model';

// Validador personalizado para stock
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
  mascotas: Mascota[] = [];
  medicamentos: Medicamento[] = [];
  medicamentoSeleccionado: Medicamento | null = null;
  veterinario: Veterinario | null = null;
  error: string | null = null;
  isLoading: boolean = false;
  stockError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    private medicamentosService: MedicamentosService,
    private tratamientoService: TratamientoService,
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {
    this.tratamientoForm = this.fb.group({
      mascotaId: ['', Validators.required],
      fecha: ['', Validators.required],
      medicamentoId: ['', Validators.required],
      cantidadUsada: [
        1, 
        [
          Validators.required, 
          Validators.min(1),
          Validators.pattern(/^[1-9]\d*$/) // Solo números positivos
        ]
      ],
      tipoTratamiento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.cargarVeterinario();
    
    // Suscribirse a cambios para validaciones en tiempo real
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
    // Cargar mascotas activas
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

    // Cargar medicamentos
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
    const medicamentoId = this.tratamientoForm.get('medicamentoId')?.value;
    this.medicamentoSeleccionado = this.medicamentos.find(m => m.id === medicamentoId) || null;
    
    // Actualizar validador de stock
    const cantidadControl = this.tratamientoForm.get('cantidadUsada');
    if (cantidadControl) {
      cantidadControl.setValidators([
        Validators.required, 
        Validators.min(1),
        Validators.pattern(/^[1-9]\d*$/),
        stockValidator(this.medicamentoSeleccionado)
      ]);
      cantidadControl.updateValueAndValidity();
    }
    
    this.validarStock();
  }

  validarStock(): void {
    const cantidadControl = this.tratamientoForm.get('cantidadUsada');
    
    if (cantidadControl && this.medicamentoSeleccionado) {
      const cantidad = Number(cantidadControl.value);
      const stockDisponible = this.medicamentoSeleccionado.unidadesDisponibles;
      
      if (!isNaN(cantidad) && cantidad > stockDisponible) {
        this.stockError = `Error: Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`;
        cantidadControl.setErrors({ stockInsuficiente: true });
      } else {
        this.stockError = null;
        // Solo limpiar errores de stock, mantener otros errores de validación
        if (cantidadControl.errors?.['stockInsuficiente']) {
          const newErrors = { ...cantidadControl.errors };
          delete newErrors['stockInsuficiente'];
          cantidadControl.setErrors(Object.keys(newErrors).length ? newErrors : null);
        }
      }
    } else {
      this.stockError = null;
    }
  }

  getStockDisponible(): number {
    return this.medicamentoSeleccionado?.unidadesDisponibles || 0;
  }

  onSubmit(): void {
    if (this.tratamientoForm.valid && !this.stockError) {
      this.isLoading = true;
      this.error = null;

      const formValue = this.tratamientoForm.value;
      
      // Validar stock una vez más antes de enviar
      if (this.medicamentoSeleccionado && formValue.cantidadUsada > this.medicamentoSeleccionado.unidadesDisponibles) {
        this.error = `No hay suficiente stock de ${this.medicamentoSeleccionado.nombre}. Stock disponible: ${this.medicamentoSeleccionado.unidadesDisponibles}`;
        this.isLoading = false;
        return;
      }

      if (!this.veterinario?.id) {
        this.error = 'No se pudo identificar al veterinario. Por favor, inicie sesión nuevamente.';
        this.isLoading = false;
        return;
      }

      // Usar el endpoint que actualiza automáticamente el stock
      const tratamientoData = {
        idMascota: formValue.mascotaId,
        idMedicamento: formValue.medicamentoId,
        idVeterinario: this.veterinario.id,
        cantidadUsada: formValue.cantidadUsada
      };

      console.log('Enviando tratamiento:', tratamientoData);

      this.tratamientoService.administrarMedicamento(tratamientoData).subscribe({
        next: (response) => {
          this.isLoading = false;
          // ✅ CORREGIDO: Redirigir a la ruta correcta
          this.router.navigate(['/mascotas/ver-mascotas']);
          
          // Opcional: Mostrar mensaje de éxito
          console.log('Tratamiento guardado exitosamente');
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error al guardar tratamiento:', error);
          this.error = error.error?.message || 'Error al guardar el tratamiento. Por favor, intente nuevamente.';
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.tratamientoForm.controls).forEach(key => {
        const control = this.tratamientoForm.get(key);
        control?.markAsTouched();
      });
      
      if (!this.error) {
        this.error = 'Por favor complete todos los campos requeridos correctamente.';
      }
    }
  }
}