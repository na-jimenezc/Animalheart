import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { ClienteService } from '../../../../core/services/cliente.service'; 
import { Cliente } from '../../../../core/models/cliente.model';
import { MascotaCreateDTO } from '../../../../core/models/DTO/mascota-create.dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-mascota',
  standalone: true, 
  templateUrl: './agregar-mascota.html',
  styleUrls: ['./agregar-mascota.css'],
   imports: [CommonModule, ReactiveFormsModule]
})
export class AgregarMascota implements OnInit {
  mascotaForm!: FormGroup;
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  submitted = false;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    private clientesService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
      tipo: ['', Validators.required],
      raza: ['', Validators.required],
      peso: [null],
      enfermedad: [''],
      fotoURL: [''],
      clienteId: ['', Validators.required],
      activo: [true]
    });

    this.clientesService.findAll().subscribe({
      next: (clientes) => (this.clientes = clientes),
      error: (err) => console.error('Error cargando clientes', err)
    });
  }

  get f() {
    return this.mascotaForm.controls;
  }

  onClienteChange(): void {
    const id = this.mascotaForm.get('clienteId')?.value;
    this.clienteSeleccionado = this.clientes.find(c => c.id == id) || null;
  }

  onFotoUrlChange(): void {
  }

  onTipoChange(): void {
    const tipo = this.mascotaForm.get('tipo')?.value;
    const fotoUrlControl = this.mascotaForm.get('fotoUrl');
    
    if (tipo && !fotoUrlControl?.value) {
      const defaultImage = tipo === 'Perro' 
        ? '/assets/images/defaultPerro.jpg'
        : '/assets/images/defaultGato.png';
      fotoUrlControl?.setValue(defaultImage);
    }
  }

  onImageError(): void {
    this.mascotaForm.patchValue({ fotoUrl: '' });
  }

  onSubmit(): void {
    if (this.mascotaForm.valid) {
      const formValue = this.mascotaForm.value;

      const dto: MascotaCreateDTO = {
        ...formValue,
        estado: formValue.enfermedad && formValue.enfermedad.trim() !== ''
          ? 'Enfermo'
          : 'Sano'
      };

      this.mascotasService.create(dto).subscribe({
        next: (res) => {
          console.log('Mascota creada', res);
          this.mascotaForm.reset();
        },
        error: (err) => console.error('Error creando mascota', err)
      });
    }
  }
}