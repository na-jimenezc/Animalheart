import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {

    private apiUrl = 'http://localhost:8080/api/veterinarios'; 
    private veterinarioSubject = new BehaviorSubject<Veterinario | null>(null);
    veterinario$ = this.veterinarioSubject.asObservable();

  //private veterinarios = VETERINARIOS_SEED;

  constructor(private http: HttpClient) {}


  //Función para el login del veterinario
  login(usuario: string, contrasenia: string): Observable<Veterinario | null> {
    const params = new HttpParams()
      .set('nombreUsuario', usuario)
      .set('contrasenia', contrasenia);

    return this.http.post<Veterinario | null>(
      `${this.apiUrl}/login`,
      null,
      { params }
    );

  }

  //Función para establecer el veterinario logeado
  setVeterinarioLogeado(vet: Veterinario): void {
    this.veterinarioSubject.next(vet);
  }

  //Función para el logout del veterinario
  logout(): void {
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
