import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MascotasService } from '../../../../core/services/mascotas.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-agregar-mascota',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './agregar-mascota.html',
  styleUrl: './agregar-mascota.css'
})
export class AgregarMascota implements OnInit {
  mascotaForm: FormGroup;
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.mascotaForm = this.createForm();
  }

  ngOnInit(): void {
    this.clientes = this.clienteService.obtenerTodos();
  }

  createForm(): FormGroup {
    return this.fb.group({
      fotoUrl: [''], // Inicialmente vacío para mostrar placeholder
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      tipo: ['', Validators.required], // Sin valor por defecto
      raza: ['', [Validators.required, Validators.minLength(2)]],
      edad: [1, [Validators.required, Validators.min(0), Validators.max(30)]],
      enfermedad: ['Ninguna'],
      peso: [1, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      clienteId: ['', Validators.required]
    });
  }

  get f() { return this.mascotaForm.controls; }

  onClienteChange(): void {
    const clienteId = this.mascotaForm.get('clienteId')?.value;
    if (clienteId) {
      this.clienteSeleccionado = this.clienteService.obtenerPorId(clienteId) || null;
    } else {
      this.clienteSeleccionado = null;
    }
  }

  onTipoChange(): void {
    const tipo = this.mascotaForm.get('tipo')?.value;
    const fotoUrlControl = this.mascotaForm.get('fotoUrl');
    
    // Solo asignar imagen por defecto si no hay una URL específica
    if (tipo && !fotoUrlControl?.value) {
      const defaultImage = tipo === 'Perro' 
        ? '/assets/images/defaultPerro.jpg'
        : '/assets/images/defaultGato.png';
      fotoUrlControl?.setValue(defaultImage);
    }
  }

  onFotoUrlChange(): void {
    // La vista previa se actualiza automáticamente via binding lol
  }

  onImageError(): void {
    // Si la imagen da error, limpiar la URL y mostrar el default
    this.mascotaForm.patchValue({ fotoUrl: '' });
  }

  onSubmit(): void {
  this.submitted = true;
  this.successMessage = '';
  this.errorMessage = '';

 
  if (this.guardando) return;
  this.guardando = true;

  if (this.mascotaForm.invalid) {
    this.guardando = false;
    return;
  }

  try {
    const formData = this.mascotaForm.value;
    
    const cliente = this.clienteService.obtenerPorId(formData.clienteId);
    if (!cliente) {
      this.errorMessage = 'El cliente seleccionado no existe';
      this.guardando = false;
      return;
    }

    if (!formData.fotoUrl && formData.tipo) {
      formData.fotoUrl = formData.tipo === 'Perro' 
        ? '/assets/images/defaultPerro.jpg'
        : '/assets/images/defaultGato.png';
    }

    this.mascotasService.create({
      ...formData,
      activo: true
    });
    
    this.successMessage = 'Mascota registrada correctamente';
    
    setTimeout(() => {
      this.router.navigate(['/mascotas/ver-mascotas']);
      this.guardando = false;
    }, 2000);
    
  } catch (error) {
    this.errorMessage = 'Error al registrar la mascota: ' + (error as Error).message;
    this.guardando = false;
  }
}

  onCancel(): void {
    this.router.navigate(['/mascotas/ver-mascotas']);
  }
}