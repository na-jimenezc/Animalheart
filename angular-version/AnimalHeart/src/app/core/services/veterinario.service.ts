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

  getAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.apiUrl);
  }

  getActivos(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/activos`);
  }

  getById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/${id}`);
  }

  create(vet: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(this.apiUrl, vet);
  }

  update(id: number, vet: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.apiUrl}/${id}`, vet);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}