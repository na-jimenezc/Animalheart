import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdministradorService } from '../../core/services/administrador.service';
import { DashboardComponent } from './dashboard/dashboard';
import { AdminHeader } from '../../componentes/admin-header/admin-header';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DashboardComponent, AdminHeader],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css'
})
export class Administrador implements OnInit {
  admin: any = null;
  veterinarios: any[] = [];
  cargando = true;
  dashboardReady = false; // Nueva propiedad

  constructor(
    private router: Router,
    private adminService: AdministradorService
  ) {}

  ngOnInit() {
    this.admin = this.adminService.getAdminFromStorage();
    
    if (!this.admin) {
      this.router.navigate(['/admin/login']);
      return;
    }

    // Primero cargar veterinarios, luego mostrar dashboard
    this.cargarVeterinarios();
  }

  cargarVeterinarios() {
    this.adminService.getVeterinarios().subscribe({
      next: (veterinarios: any[]) => {
        this.veterinarios = veterinarios;
        this.cargando = false;
        // Esperar un tick antes de mostrar el dashboard
        setTimeout(() => {
          this.dashboardReady = true;
        }, 0);
      },
      error: (error: any) => {
        console.error('Error cargando veterinarios:', error);
        this.cargando = false;
        setTimeout(() => {
          this.dashboardReady = true;
        }, 0);
      }
    });
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }
}