// administrador.service.ts - ACTUALIZADO
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Administrador } from '../models/administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

 
  login(correo: string, clave: string): Observable<Administrador> {
    const loginData = { correo, clave };
    
    return this.http.post<Administrador>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(admin => {
          console.log('Login exitoso, guardando en sessionStorage:', admin);
          sessionStorage.setItem('admin', JSON.stringify(admin));
        })
      );
  }

  getVeterinarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/veterinarios`);
  }

  getAdminFromStorage(): Administrador | null {
    const adminData = sessionStorage.getItem('admin');
    return adminData ? JSON.parse(adminData) : null;
  }

  logout(): void {
    sessionStorage.removeItem('admin');
  }
}