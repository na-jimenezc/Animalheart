import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardData } from '../../../core/services/dashboard.service';
import { TotalTratamientosMes } from './total-tratamientos-mes/total-tratamientos-mes';
import { TratamientosTipoMedicamento } from './tratamientos-tipo-medicamento/tratamientos-tipo-medicamento';
import { Top3Tratamientos } from './top3-tratamientos/top3-tratamientos';
import { MascotasTotalesActivas } from './mascotas-totales-activas/mascotas-totales-activas';
import { GananciasTotales } from './ganancias-totales/ganancias-totales';
import { VentasTotales } from './ventas-totales/ventas-totales';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TotalTratamientosMes,
    TratamientosTipoMedicamento,
    Top3Tratamientos,
    MascotasTotalesActivas,
    GananciasTotales,
    VentasTotales
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData = {
    totalTratamientosUltimoMes: 0,
    tratamientosPorMedicamento: [],
    veterinariosActivos: 0,
    veterinariosInactivos: 0,
    totalMascotas: 0,
    mascotasActivas: 0,
    ventasTotales: 0,
    gananciasTotales: 0,
    top3Tratamientos: [],
    todosVeterinarios: []
  };
  
  loading = true;
  error = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.dashboardService.getDashboardData().subscribe({
    next: (data) => {
      const ventas  = Number(data.ventasTotales)   || 0;
      const gan     = Number(data.gananciasTotales)|| 0;

      const tpm = Array.isArray(data.tratamientosPorMedicamento)
        ? data.tratamientosPorMedicamento.map(x => ({
            medicamento: String(x.medicamento ?? 'Sin nombre'),
            cantidad: Number(x.cantidad) || 0
          }))
        : [];

      const top3 = Array.isArray(data.top3Tratamientos)
        ? data.top3Tratamientos.map(x => ({
            medicamento: String(x.medicamento ?? 'Sin nombre'),
            unidadesVendidas: Number(x.unidadesVendidas) || 0
          }))
        : [];

      this.dashboardData = {
        ...data,
        ventasTotales: ventas,
        gananciasTotales: gan,
        tratamientosPorMedicamento: tpm,
        top3Tratamientos: top3,
        totalTratamientosUltimoMes: Number(data.totalTratamientosUltimoMes) || 0,
        totalMascotas: Number(data.totalMascotas) || 0,
        mascotasActivas: Number(data.mascotasActivas) || 0,
        veterinariosActivos: Number(data.veterinariosActivos) || 0,
        veterinariosInactivos: Number(data.veterinariosInactivos) || 0,
      };

      this.loading = false;
    }
    ,
      error: (error) => {
        this.error = 'Error cargando los datos del dashboard';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  refreshDashboard(): void {
    this.loadDashboardData();
  }
}