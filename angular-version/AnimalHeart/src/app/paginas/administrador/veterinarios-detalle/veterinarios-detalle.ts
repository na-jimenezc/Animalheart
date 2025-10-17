import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { Veterinario } from '../../../core/models/veterinario.model';
import { VeterinarioUpdateDTO } from '../../../core/models/DTO/veterinario-update.dto';
import { AdminHeader } from '../../../componentes/admin-header/admin-header';

@Component({
  selector: 'app-veterinarios-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './veterinarios-detalle.html',
  styleUrl: './veterinarios-detalle.css'
})
export class VeterinariosDetalleComponent implements OnInit {
  veterinario: Veterinario | null = null;
  veterinarioEdit: VeterinarioUpdateDTO = {
    nombre: '',
    especialidad: '',
    nombreUsuario: '',
    imagen: '',
    contrasenia: ''
  };
  
  loading: boolean = true;
  error: string = '';
  modoEdicion: boolean = false;
  guardando: boolean = false;

  // Exponer encodeURIComponent para usar en el template
  encodeURIComponent = encodeURIComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    console.log('🔧 Constructor llamado en detalle de veterinario');
  }

  ngOnInit(): void {
    console.log('🚀 ngOnInit llamado en detalle del veterinario');
    const id = this.route.snapshot.paramMap.get('id');
    console.log('🆔 ID obtenido de la ruta:', id);
    
    if (id) {
      this.cargarVeterinario(Number(id));
    } else {
      this.error = 'ID de veterinario no válido';
      this.loading = false;
      console.error('❌ ID no válido');
    }
  }

  private cargarVeterinario(id: number): void {
    console.log('📡 Cargando veterinario con ID:', id);
    this.loading = true;
    this.error = '';
    
    this.cdr.markForCheck();
    
    this.veterinarioService.getById(id).subscribe({
      next: (vet) => {
        console.log('✅ Veterinario recibido del backend:', vet);
        
        this.ngZone.run(() => {
          this.veterinario = { ...vet };
          this.loading = false;
          
          this.cdr.markForCheck();
          this.cdr.detectChanges();
          
          console.log('✨ Veterinario cargado:', this.veterinario.nombre);
          
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        });
      },
      error: (err) => {
        console.error('❌ Error al cargar veterinario:', err);
        
        this.ngZone.run(() => {
          this.error = 'Error al cargar los datos del veterinario. Por favor, intente nuevamente.';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  activarEdicion(): void {
    if (!this.veterinario) return;
    
    console.log('✏️ Activando modo edición');
    
    // Copiar los datos actuales al objeto de edición
    this.veterinarioEdit = {
      nombre: this.veterinario.nombre,
      especialidad: this.veterinario.especialidad,
      nombreUsuario: this.veterinario.nombreUsuario,
      imagen: this.veterinario.imagen,
      contrasenia: '' // Vacío por defecto
    };
    
    this.modoEdicion = true;
    this.cdr.detectChanges();
  }

  cancelarEdicion(): void {
    console.log('❌ Cancelando edición');
    this.modoEdicion = false;
    this.veterinarioEdit = {
      nombre: '',
      especialidad: '',
      nombreUsuario: '',
      imagen: '',
      contrasenia: ''
    };
    this.cdr.detectChanges();
  }

  guardarCambios(): void {
    if (!this.veterinario || !this.veterinario.id) {
      console.error('❌ No hay veterinario para actualizar');
      return;
    }

    // Validación básica
    if (!this.veterinarioEdit.nombre.trim() || 
        !this.veterinarioEdit.especialidad.trim() || 
        !this.veterinarioEdit.nombreUsuario.trim()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    console.log('💾 Guardando cambios...');
    this.guardando = true;

    // Preparar el objeto a enviar
    const veterinarioActualizado: any = {
      ...this.veterinario,
      nombre: this.veterinarioEdit.nombre.trim(),
      especialidad: this.veterinarioEdit.especialidad.trim(),
      nombreUsuario: this.veterinarioEdit.nombreUsuario.trim(),
      imagen: this.veterinarioEdit.imagen.trim()
    };

    // Solo incluir contraseña si se proporcionó una nueva
    if (this.veterinarioEdit.contrasenia && this.veterinarioEdit.contrasenia.trim()) {
      veterinarioActualizado.contrasenia = this.veterinarioEdit.contrasenia.trim();
    }

    this.veterinarioService.update(this.veterinario.id, veterinarioActualizado).subscribe({
      next: (vetActualizado) => {
        console.log('✅ Veterinario actualizado:', vetActualizado);
        
        this.ngZone.run(() => {
          this.veterinario = { ...vetActualizado };
          this.modoEdicion = false;
          this.guardando = false;
          
          this.cdr.detectChanges();
          
          alert('Veterinario actualizado exitosamente.');
        });
      },
      error: (err) => {
        console.error('❌ Error al actualizar veterinario:', err);
        
        this.ngZone.run(() => {
          this.guardando = false;
          alert('Error al actualizar el veterinario. Por favor, intenta de nuevo.');
          this.cdr.detectChanges();
        });
      }
    });
  }

  volverLista(): void {
    console.log('🔙 Volviendo a la lista');
    this.router.navigate(['/admin/veterinarios']);
  }
}