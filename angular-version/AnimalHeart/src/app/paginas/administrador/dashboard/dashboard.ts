import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardData } from '../../../core/services/dashboard.service';
import { TotalTratamientosMes } from './total-tratamientos-mes/total-tratamientos-mes';
import { TratamientosTipoMedicamento } from './tratamientos-tipo-medicamento/tratamientos-tipo-medicamento';
import { Top3Tratamientos } from './top3-tratamientos/top3-tratamientos';
import { MascotasTotalesActivas } from './mascotas-totales-activas/mascotas-totales-activas';
import { GananciasTotales } from './ganancias-totales/ganancias-totales';
import { VentasTotales } from './ventas-totales/ventas-totales';
import { Subscription } from 'rxjs';

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
    VentasTotales,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
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
  private subscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('Constructor llamado');
  }

  ngOnInit(): void {
    console.log('ngOnInit llamado');
    console.log('Estado inicial - loading:', this.loading);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit llamado');

    setTimeout(() => {
      console.log('Timeout completado en ngAfterViewInit');
      this.loadDashboardData();
    }, 100);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy llamado');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDashboardData(): void {
    console.log('loadDashboardData iniciado');
    console.log('loading antes de establecer true:', this.loading);
    
    this.loading = true;
    this.error = '';
    
    console.log('loading después de establecer true:', this.loading);
    
    if (this.subscription) {
      console.log('Cancelando suscripción anterior');
      this.subscription.unsubscribe();
    }

    const timeoutId = setTimeout(() => {
      console.log('Timeout de 30s alcanzado');
      if (this.loading) {
        this.error = 'Tiempo de espera agotado. Por favor, intente nuevamente.';
        this.loading = false;
        console.log('imeout - loading establecido a false');
      }
    }, 30000);

    console.log('Llamando a dashboardService.getDashboardData()...');
    
    this.subscription = this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio');
        console.log('Data:', data);
        
        clearTimeout(timeoutId);
        console.log('Timeout cancelado');
        
        const ventas = Number(data.ventasTotales) || 0;
        const gan = Number(data.gananciasTotales) || 0;

        console.log('Ventas calculadas:', ventas);
        console.log('Ganancias calculadas:', gan);

        const tpm = Array.isArray(data.tratamientosPorMedicamento)
          ? data.tratamientosPorMedicamento.map(x => ({
              medicamento: String(x.medicamento ?? 'Sin nombre'),
              cantidad: Number(x.cantidad) || 0
            }))
          : [];

        console.log('Tratamientos por medicamento:', tpm.length, 'items');

        const top3 = Array.isArray(data.top3Tratamientos)
          ? data.top3Tratamientos.map(x => ({
              medicamento: String(x.medicamento ?? 'Sin nombre'),
              unidadesVendidas: Number(x.unidadesVendidas) || 0
            }))
          : [];

        console.log('Top 3 tratamientos:', top3.length, 'items');

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

        console.log('dashboardData actualizado:', this.dashboardData);
        console.log('loading antes de setTimeout:', this.loading);
        
        //setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          console.log('setTimeout ejecutado para cambiar loading');
          console.log('loading antes de cambio:', this.loading);
          this.loading = false;
          console.log('loading después de cambio:', this.loading);
          
          //DETECCIÓN DE CAMBIOS :DDDDD (ERA ESTO)
          this.cdr.detectChanges();
          console.log('detectChanges() ejecutado');
          console.log('Datos cargados exitosamente');
        }, 0);
      },
      error: (error) => {
        console.error('Error recibido del servicio');
        console.error('Error:', error);
        
        clearTimeout(timeoutId);
        this.error = 'Error cargando los datos del dashboard. Por favor, intente nuevamente.';
        
        setTimeout(() => {
          console.log('Estableciendo loading a false por error');
          this.loading = false;
          this.cdr.detectChanges();
          console.log('loading después de error:', this.loading);
        }, 0);
      },
      complete: () => {
        console.log('Observable completado');
      }
    });
  }

  refreshDashboard(): void {
    console.log('refreshDashboard llamado');
    this.loadDashboardData();
  }
}