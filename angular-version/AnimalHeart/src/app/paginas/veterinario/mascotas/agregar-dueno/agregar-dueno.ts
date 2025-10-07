import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-agregar-dueno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './agregar-dueno.html',
  styleUrl: './agregar-dueno.css'
})
export class AgregarDueno {
  clienteForm: FormGroup;
  cargando = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(5)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMessage = '';
    this.successMessage = '';

    const clienteData: Cliente = this.clienteForm.value;

    
    this.clienteService.addCliente(clienteData).subscribe({
      next: (clienteCreado) => {
        this.successMessage = `Dueño ${clienteCreado.nombre} registrado exitosamente`;
        this.cargando = false;
        
        setTimeout(() => {
          this.router.navigate(['/mascotas/agregar']);
        }, 1000);
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error al crear cliente:', error);
        
        if (error.status === 400) {
          this.errorMessage = 'Error en los datos enviados. Verifica la información.';
        } else if (error.status === 409 || error.status === 500) {
          this.errorMessage = 'Ya existe un cliente con esta cédula.';
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión con el servidor. Verifica que el backend esté ejecutándose.';
        } else {
          this.errorMessage = 'Error al registrar el dueño. Por favor, intenta nuevamente.';
        }
      }
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.clienteForm.controls).forEach(key => {
      this.clienteForm.get(key)?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/mascotas/ver-mascotas']);
  }

  get cedula() { return this.clienteForm.get('cedula'); }
  get nombre() { return this.clienteForm.get('nombre'); }
  get correo() { return this.clienteForm.get('correo'); }
  get celular() { return this.clienteForm.get('celular'); }
}