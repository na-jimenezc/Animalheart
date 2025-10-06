import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private apiUrl = 'http://localhost:8080/api/veterinarios';
  private veterinarioSubject = new BehaviorSubject<Veterinario | null>(null);
  veterinario$ = this.veterinarioSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasenia: string): Observable<Veterinario> {
    const params = new HttpParams()
      .set('nombreUsuario', usuario)
      .set('contrasenia', contrasenia);

    return this.http.post<Veterinario>(`${this.apiUrl}/login`, null, { params }).pipe(
      tap(vet => {
        sessionStorage.setItem('vet', JSON.stringify(vet));
        this.veterinarioSubject.next(vet);
      })
    );
  }

  getVetFromStorage(): Veterinario | null {
    const raw = sessionStorage.getItem('vet');
    return raw ? JSON.parse(raw) as Veterinario : null;
  }

  setVeterinarioLogeado(vet: Veterinario): void {
    sessionStorage.setItem('vet', JSON.stringify(vet));
    this.veterinarioSubject.next(vet);
  }

  logout(): void {
    sessionStorage.removeItem('vet');
    this.veterinarioSubject.next(null);
  }

  //Función para obtener todos los veterinarios
  getAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.apiUrl);
  }

  //Función para obtener todos los veterinarios activos
  getActivos(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/activos`);
  }

  //Función para obtener todos los veterinarios por ID
  getById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/${id}`);
  }

  //Función para crear un veterinario
  create(vet: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(this.apiUrl, vet);
  }

  //Función para actualizar un veterinario
  update(id: number, vet: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.apiUrl}/${id}`, vet);
  }

  //Función para eliminar un veterinario
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*Función para validar las credenciales del veterinario y guardar el veterinario
  validarCredenciales(usuario: string, contrasena: string): Veterinario | null {
    const vet = this.veterinarios.find(
      v => v.nombreUsuario === usuario && v.contrasena === contrasena
    ) || null;

    if (vet) {
      this.veterinarioSubject.next(vet); 
    }

    return vet;
  }

  //Función del logout
  logout(): void {
    this.veterinarioSubject.next(null);
  }*/
}
