import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../../core/services/administrador.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css'
})
export class AdminHeader {

  constructor(
    private router: Router,
    private adminService: AdministradorService
  ) {}

  logout() {
    console.log('Cerrando sesión del administrador');
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }
}