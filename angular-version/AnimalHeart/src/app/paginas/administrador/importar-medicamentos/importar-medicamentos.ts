import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentosService } from '../../../core/services/medicamentos.service';

@Component({
  selector: 'app-importar-medicamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './importar-medicamentos.html',
  styleUrls: ['./importar-medicamentos.css']
})
export class ImportarMedicamentos {
  archivo?: File;
  resultado?: { totalFilas:number; insertados:number; actualizados:number; errores:string[] };
  cargando = false;
  error = '';

  constructor(private medsSrv: MedicamentosService) {}

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.archivo = input.files?.[0] || undefined;
  }

  subir() {
    if (!this.archivo) return;
    this.cargando = true;
    this.error = '';
    this.resultado = undefined;

    this.medsSrv.importFromExcel(this.archivo).subscribe({
      next: (res) => { this.resultado = res; this.cargando = false; },
      error: (err) => { this.error = err.error?.message || 'Error subiendo archivo'; this.cargando = false; }
    });
  }
}
