// administrador.ts - CORREGIDO
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdministradorService } from '../../services/administrador.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css'
})
export class Administrador implements OnInit {
  admin: any = null;
  veterinarios: any[] = [];
  cargando = true;
  constructor(
    private router: Router,
    @Inject(AdministradorService) private adminService: AdministradorService
  ) {}

  ngOnInit() {
    // Verificar si hay sesión activa
    this.admin = this.adminService.getAdminFromStorage();
    
    if (!this.admin) {
      // Si no hay sesión, redirigir al login
      this.router.navigate(['/admin/login']);
      return;
    }

    this.cargarVeterinarios();
  }

  cargarVeterinarios() {
    this.adminService.getVeterinarios().subscribe({
      next: (veterinarios: any[]) => {
        this.veterinarios = veterinarios;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error cargando veterinarios:', error);
        this.cargando = false;
      }
    });
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }

  getWelcomeMessage(): string {
    return this.admin 
      ? `¡Bienvenido, ${this.admin.nombre}! - ${new Date().toLocaleString()}`
      : 'Bienvenido al Dashboard';
  }
}