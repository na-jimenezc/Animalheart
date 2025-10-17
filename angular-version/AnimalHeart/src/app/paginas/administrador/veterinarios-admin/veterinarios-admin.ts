import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VeterinarioService } from '../../../core/services/veterinario.service';
import { Veterinario } from '../../../core/models/veterinario.model';
import { AdminHeader } from '../../../componentes/admin-header/admin-header';

@Component({
  selector: 'app-veterinarios-admin',
  standalone: true,
  imports: [CommonModule, AdminHeader, RouterLink],
  templateUrl: './veterinarios-admin.html',
  styleUrl: './veterinarios-admin.css'
})
export class VeterinariosAdminComponent implements OnInit {
  veterinarios: Veterinario[] = [];
  loading: boolean = true;
  error: string = '';
  procesando: boolean = false;
  eliminandoId: number | null = null; //Para controlar qué veterinario se está eliminando

  //Se usa para facilitar las rutas de imágenes
  encodeURIComponent = encodeURIComponent;

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    console.log('Constructor llamado en lista de veterinarios');
  }

  ngOnInit(): void {
    console.log('ngOnInit llamado en lista de veterinarios');
    this.cargarVeterinarios();
  }

  cargarVeterinarios(): void {
    console.log('Iniciando carga de veterinarios...');
    console.log('URL del servicio:', 'http://localhost:8080/api/veterinarios');
    
    this.loading = true;
    this.error = '';
    
    //Se carga el estado inicial con los datos actuales
    this.cdr.markForCheck();
    
    this.veterinarioService.getAll().subscribe({
      next: (vets) => {
        console.log('Respuesta recibida del backend');
        console.log('Cantidad de veterinarios:', vets?.length || 0);
        console.log('Datos completos:', vets);
        
        if(vets && vets.length>0){
          console.log('Primer veterinario:', vets[0]);
        }
        
        //Se usa ngZone para asegurar que los cambios se reflejen en la UI

        this.ngZone.run(() => {
          //Se revisa que se haya recibido un array
          this.veterinarios = Array.isArray(vets) ? [...vets] : [];
          this.loading = false;
          
          console.log('Estado actualizado. Veterinarios en componente:', this.veterinarios.length);
          
          //Forzar la detección de cambios
          //Se usa markForCheck + detectChanges para asegurar que todo se actualice correctamente
          //Especialmente útil en listas grandes o cuando se hacen muchos cambios
          this.cdr.markForCheck();
          this.cdr.detectChanges();
          
          console.log('Detección de cambios ejecutada (markForCheck + detectChanges)');
          
          //Se hace una verificación adicional después del renderizado
          setTimeout(() => {
            console.log('Verificación post-render:', this.veterinarios.length, 'veterinarios');
            this.cdr.detectChanges();
          }, 0);
        });
      },
      error: (err) => {
        console.error('Error al cargar veterinarios');
        console.error('Tipo de error:', err.name);
        console.error('Mensaje:', err.message);
        console.error('Status:', err.status);
        console.error('Error completo:', err);
        
        //Otros mensajes de error
        this.ngZone.run(() => {
          if (err.status === 0) {
            this.error = 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:8080';
          } else if (err.status === 404) {
            this.error = 'Endpoint no encontrado. Verifica la URL del API.';
          } else if (err.status === 500) {
            this.error = 'Error interno del servidor. Revisa los logs del backend.';
          } else {
            this.error = `Error al cargar los veterinarios: ${err.message || 'Error desconocido'}`;
          }
          
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      //Se hace la confirmación de que la petición se completó
      complete: () => {
        console.log('Petición completada');
      }
    });
  }

  verDetalle(id: number): void {
    console.log('Navegando a detalle del veterinario:', id);
    this.router.navigate(['/admin/veterinarios', id]);
  }

  //M´etodo para activar o desactivar un veterinario
  toggleActivo(vet: Veterinario): void{
    //Se previene que se hagan múltiples cambios al mismo tiempo
    if (this.procesando && this.eliminandoId !== vet.id) {
      return;
    }

    //Se determina el nuevo estado según el estado actualy se pide confirmación
    const nuevoEstado = vet.activo === 1 ? 0 : 1;
    const accion = nuevoEstado === 1 ? 'activar' : 'desactivar';
    
    console.log(`${accion.toUpperCase()} veterinario:`, vet.id, vet.nombre);
    
    if (!confirm(`¿Estás seguro de que quieres ${accion} a ${vet.nombre}?`)) {
      return;
    }

    //Solo deshabilitar los botones del usuario que se está cambiando
    const vetProcesandoId = vet.id!;
    this.procesando = true;
    
    //Se guarda el ID del veterinario que se está eliminando
    this.veterinarioService.updateEstado(vet.id!, nuevoEstado).subscribe({
      next: (response) => {
        console.log(`Veterinario ${accion}do correctamente:`, response);
        
        this.ngZone.run(() => {
          //Se actualiza el estado localmente
          const index = this.veterinarios.findIndex(v =>v.id === vet.id);

          if(index !== -1){
            this.veterinarios[index].activo = nuevoEstado;
          }
          
          //Se reactiva la interfaz solamente para el veterinario que se estaba procesando
          //(se estaba bloqueando la inferfaz completa)
          if(vetProcesandoId === vet.id){
            this.procesando = false;
          }
          
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error(`Error al ${accion} veterinario:`, err);
        
        this.ngZone.run(() =>{
          //Solo se reactiva si es el mismo veterinario que estaba procesando
          if(vetProcesandoId===vet.id){
            this.procesando = false;
          }
          
          //Mensaje de error
          alert(`Error al ${accion} el veterinario: ${err.message || 'Error desconocido'}`);
          
          this.cdr.detectChanges();
        });
      }
    });
  }

  //Método para eliminar completamente un veterinario
  eliminarVeterinario(vet: Veterinario): void {
    if(this.procesando){
      return;
    }

    console.log(`Intentando eliminar veterinario:`, vet.id, vet.nombre);
    
    //CONFIRMACIÓN PARA ELIMINAR UN VETERINARIO
    if (!confirm(`¿Estás ABSOLUTAMENTE seguro de que quieres ELIMINAR PERMANENTEMENTE a ${vet.nombre}?\n\nEsta acción no se puede deshacer y se perderán todos los datos asociados.`)) {
      return;
    }

    this.eliminandoId = vet.id!;
    this.procesando = true;
    
    this.veterinarioService.delete(vet.id!).subscribe({
      next: () => {
        console.log(`Veterinario eliminado correctamente:`, vet.id);
        
        this.ngZone.run(() => {
          //Se elimina el veterinario de la lista localmente
          this.veterinarios = this.veterinarios.filter(v => v.id !== vet.id);
          
          this.procesando = false;
          this.eliminandoId = null;
          this.cdr.detectChanges();
          
          //Se muestra mensaje de éxito
          alert(`Veterinario ${vet.nombre} eliminado correctamente.`);
        });
      },

      error: (err) => {
        console.error(`Error al eliminar veterinario:`, err);
        
        this.ngZone.run(() => {
          this.procesando = false;
          this.eliminandoId = null;
          
          //Mensajes de error
          let mensajeError = `Error al eliminar el veterinario: ${err.message || 'Error desconocido'}`;
          
          if (err.status===409) {
            mensajeError = 'No se puede eliminar el veterinario porque tiene tratamientos o citas asociadas.';
          } else if (err.status===404) {
            mensajeError = 'Veterinario no encontrado.';
          } else if (err.status===500) {
            mensajeError = 'Error interno del servidor. El veterinario podría tener datos asociados.';
          }
          
          alert(mensajeError);
          this.cdr.detectChanges();
        });
      }
    });
  }

  //Método auxiliar para debugging en template
  trackByVetId(index: number, vet: Veterinario): number{
    return vet.id || index;
  }

  //Método para verificar si un veterinario se está eliminando
  estaEliminando(vetId: number): boolean{
    return this.eliminandoId === vetId;
  }
}