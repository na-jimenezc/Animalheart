import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Mascota } from '../../../../core/models/mascota.model';
import { MascotaUpdateDTO } from '../../../../core/models/DTO/mascota-update.dto';
import { Cliente } from '../../../../core/models/cliente.model';
import { HeaderVet } from '../../../../componentes/header-vet/header-vet';
import { VeterinarioService } from '../../../../core/services/veterinario.service';
import { Veterinario } from '../../../../core/models/veterinario.model';

@Component({
  selector: 'app-editar-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderVet],
  templateUrl: './editar-mascota.html',
  styleUrl: './editar-mascota.css',
})

export class EditarMascota implements OnInit {
  form!: FormGroup;
  clientes: Cliente[] = [];
  veterinario: Veterinario | null = null;
  error: string | null = null;

  submitted = false;
  cargando = false;
  successMessage = '';
  errorMessage = '';

  id!: number;
  mascotaActual?: Mascota;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mascotasService: MascotasService,
    private clienteService: ClienteService,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit(): void {
    this.obtenerIdDeRuta();
    this.cargarClientes();
    this.inicializarFormulario();
    this.cargarVeterinario();
  }

  private cargarVeterinario(): void {
    this.veterinario = this.veterinarioService.getVetFromStorage();
    if (!this.veterinario) {
      this.error = 'No se encontró información del veterinario. Por favor, inicie sesión nuevamente.';
    }
  }

  private obtenerIdDeRuta(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.cargarMascota();
    } else {
      this.errorMessage = 'ID de mascota no válido.';
    }
  }

  private cargarClientes(): void {
    this.clienteService.findAll().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        this.errorMessage = 'Error al cargar la lista de clientes';
      },
    });
  }

  private inicializarFormulario(): void {
    this.form = this.fb.group({
      fotoURL: [''],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      tipo:   ['', Validators.required],
      raza:   [''],
      edad:   [1, [Validators.required, Validators.min(0)]],
      enfermedad: ['Ninguna'],
      peso:   [1, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      clienteId: [null, Validators.required],
      activo: [true],
    });
  }

  private cargarMascota(): void {
    this.cargando = true;
    this.errorMessage = '';

    this.mascotasService.getById(this.id).subscribe({
      next: (mascota) => {
        this.mascotaActual = mascota;
        this.llenarFormulario(mascota);
        this.cargando = false;
        console.log('Mascota cargada:', mascota);
      },
      error: (err) => {
        console.error('Error cargando mascota:', err);
        this.errorMessage = 'No se pudo cargar la mascota. Verifica que exista.';
        this.cargando = false;
      }
    });
  }

  private llenarFormulario(mascota: Mascota): void {
    this.form.patchValue({
      fotoURL: mascota.fotoURL || '',
      nombre:  mascota.nombre,
      tipo:    mascota.tipo,
      raza:    mascota.raza,
      edad:    mascota.edad,
      enfermedad: mascota.enfermedad,
      peso:    mascota.peso,
      clienteId: mascota.cliente?.id ?? null,
      activo: mascota.activo,
    });
  }

  get f() {
    return this.form.controls;
  }

  getClienteSeleccionado(): Cliente | undefined {
    const raw = this.form.get('clienteId')?.value;
    const clienteId = raw == null ? null : Number(raw);
    return clienteId == null ? undefined : this.clientes.find(c => c.id === clienteId);
  }

  onTipoChange(): void {
    const tipo = this.form.get('tipo')?.value;
    const fotoCtrl = this.form.get('fotoURL');
    
    if (tipo && !fotoCtrl?.value) {
      const defaultImage = tipo === 'Perro' 
        ? '/assets/images/defaultPerro.jpg' 
        : '/assets/images/defaultGato.png';
      fotoCtrl?.setValue(defaultImage);
    }
  }

  onImageError(): void {
    this.form.patchValue({ fotoURL: '' });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Formulario inválido', this.form.errors);
      console.log(this.form.value);
      console.log(this.form.getRawValue());
      console.log(this.form.errors);
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors = this.form.get(key)?.errors;
        if (controlErrors) console.log(key, controlErrors);
      });
      return;
    }

    if (this.cargando) return;

    this.cargando = true;

    const dto: MascotaUpdateDTO = {
      nombre: this.form.value.nombre,
      tipo: this.form.value.tipo,
      raza: this.form.value.raza,
      enfermedad: this.form.value.enfermedad,
      fotoURL: this.form.value.fotoURL || this.getDefaultImage(this.form.value.tipo),
      activo: this.form.value.activo
    };

    console.log('Enviando DTO:', dto);

    this.mascotasService.update(this.id, dto).subscribe({
      next: (mascotaActualizada) => {
        this.successMessage = 'Mascota actualizada correctamente';
        console.log('Mascota actualizada:', mascotaActualizada);
        
        this.router.navigate(['/mascotas/ver-mascotas']);
      },
      error: (err) => {
        console.error('Error actualizando mascota:', err);
        this.errorMessage = 'Error al actualizar la mascota: ' + (err.error?.message || err.message);
        this.cargando = false;
      }
    });
  }

  private getDefaultImage(tipo: string): string {
    return tipo === 'Perro' 
      ? '/assets/images/defaultPerro.jpg' 
      : '/assets/images/defaultGato.png';
  }

  onCancel(): void {
    this.router.navigate(['/mascotas/ver-mascotas']);
  }

  onFotoUrlChange(): void {
    console.log('URL de foto cambiada:', this.form.get('fotoURL')?.value);
  }
}