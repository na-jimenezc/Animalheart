import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { VeterinarioCreateDTO } from '../../../core/models/DTO/veterinario-create.dto';
import { AdminHeader } from '../../../componentes/admin-header/admin-header';

@Component({
  selector: 'app-veterinario-crear',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AdminHeader],
  templateUrl: './veterinario-crear.html',
  styleUrl: './veterinario-crear.css'
})
export class VeterinarioCrear implements OnInit {
  veterinario: VeterinarioCreateDTO = {
    nombre: '',
    especialidad: '',
    nombreUsuario: '',
    contrasenia: '',
    imagen: ''
  };

  loading: boolean = false;
  error: string = '';
  mostrarExito: boolean = false;

  //Opciones predefinidas para las especialidades
  especialidades: string[] = [
    'Medicina General',
    'Cirugía',
    'Dermatología',
    'Oftalmología',
    'Cardiología',
    'Neurología',
    'Oncología',
    'Odontología',
    'Traumatología',
    'Anestesiología',
    'Radiología',
    'Patología'
  ];

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    console.log('Inicializando formulario de creación de veterinario');
  }

  crearVeterinario(form: NgForm): void {
    if (form.invalid) {
      this.marcarCamposComoSucios(form);
      return;
    }

    console.log('Creando nuevo veterinario...', this.veterinario);
    this.loading = true;
    this.error = '';

    this.veterinarioService.create(this.veterinario).subscribe({
      next: (nuevoVeterinario) => {
        console.log('Veterinario creado exitosamente:', nuevoVeterinario);
        
        this.ngZone.run(() => {
          this.loading = false;
          this.mostrarExito = true;
          
          //Se limpia el formulario cuando ya se crea el veterinario
          this.veterinario = {
            nombre: '',
            especialidad: '',
            nombreUsuario: '',
            contrasenia: '',
            imagen: ''
          };
          form.resetForm();
          
          this.cdr.detectChanges();
          
          //Se redirige a la lista de veterinarios después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/admin/veterinarios']);
          }, 2000);
        });
      },

      //Se mandan errores en caso de que algo falle
      error: (err) => {
        console.error('Error al crear veterinario:', err);
        
        this.ngZone.run(() => {
          this.loading = false;
          
          if (err.status===400) {
            this.error = 'Datos inválidos. Por favor, verifica la información.';
          } else if (err.status===409) {
            this.error = 'El nombre de usuario ya existe. Por favor, elige otro.';
          } else if (err.status===500) {
            this.error = 'Error interno del servidor. Intenta nuevamente.';
          } else {
            this.error = `Error al crear el veterinario: ${err.message || 'Error desconocido'}`;
          }
          
          this.cdr.detectChanges();
        });
      }
    });
  }

  //Se marcan los campos si ya erstán sucios
  private marcarCamposComoSucios(form: NgForm): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
  }

  //Para cancelar los datos
  cancelar(): void {
    if (confirm('¿Estás seguro de que quieres cancelar? Los datos no guardados se perderán.')) {
      this.router.navigate(['/admin/veterinarios']);
    }
  }

  //Se genera una imagen por defecto en caso de que no se haya proporcionado una
  generarImagenPorDefecto(): void {
    if (!this.veterinario.imagen && this.veterinario.nombre) {
      this.veterinario.imagen = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.veterinario.nombre)}&size=256&background=random`;
    }
  }
}