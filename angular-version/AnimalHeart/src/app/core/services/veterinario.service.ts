import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { VeterinarioCreateDTO} from '../models/DTO/veterinario-create.dto';
import { VeterinarioUpdateDTO } from '../models/DTO/veterinario-update.dto';
import { VeterinarioDTO } from '../models/DTO/veterinario.dto';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private apiUrl = 'http://localhost:8080/api/veterinarios';
  private veterinarioSubject = new BehaviorSubject<Veterinario | null>(null);
  veterinario$ = this.veterinarioSubject.asObservable();

  constructor(private http: HttpClient) {}

  //Observable para el login, se revisa contraseña, usuario y si está activo o no el veterinario
  login(usuario: string, contrasenia: string): Observable<Veterinario> {
    const params = new HttpParams()
      .set('nombreUsuario', usuario)
      .set('contrasenia', contrasenia);

    return this.http.post<Veterinario>(`${this.apiUrl}/login`, null, { params }).pipe(
      tap((vet) => {
        if (vet) {
          sessionStorage.setItem('vet', JSON.stringify(vet));
          this.veterinarioSubject.next(vet);
        }
      })
    );
  }

  //Obtiene el veterinario almacenado en sessionStorage
  getVetFromStorage(): Veterinario | null {
    const raw = sessionStorage.getItem('vet');
    return raw ? JSON.parse(raw) as Veterinario : null;
  }

  //Guarda el veterinario logeado en sessionStorage
  setVeterinarioLogeado(vet: Veterinario): void {
    sessionStorage.setItem('vet', JSON.stringify(vet));
    this.veterinarioSubject.next(vet);
  }

  //Elimina el veterinario de sessionStorage
  logout(): void {
    sessionStorage.removeItem('vet');
    this.veterinarioSubject.next(null);
  }

  //Observable para obtener todos los veterinarios
  getAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.apiUrl);
  }

  //Observable para obtener todos los veterinarios activos
  getActivos(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/activos`);
  }

  //Observable para obtener un veterinario por id
  getById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/${id}`);
  }

  //Observale para crear un nuevo veterinario
  create(veterinario: VeterinarioCreateDTO): Observable<Veterinario> {
    const nuevoVet = {
      ...veterinario,
      activo: 1,
      consultas: 0
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //Depuración de la solicitud
    console.log('Enviando veterinario al backend:', nuevoVet);
    console.log('URL destino:', this.apiUrl);
    console.log('Headers:', headers.keys().map(k => ({ [k]: headers.get(k) })));

    return this.http.post<Veterinario>(this.apiUrl, nuevoVet, { headers });
  }


  //Observable para actualizar un veterinario
  update(id: number, veterinario: Veterinario): Observable<Veterinario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    //Se envia un DTO para evitar actualizar campos no deseados con el PUT
    return this.http.put<Veterinario>(
      `${this.apiUrl}/${id}`, 
      veterinario, 
      { headers }
    );
  }

  //Observable para activar o desactivar un veterinario
  toggleActivo(id: number, activo: number): Observable<Veterinario> {

    return new Observable(observer => {
      this.getById(id).subscribe({
        next: (vet) => {
          const vetActualizado = {
            ...vet,
            activo: activo
          };
          
          //Se usa PUT porque se actualiza todo el objeto por el id basado en su activo o no activo
          this.http.put<Veterinario>(`${this.apiUrl}/${id}`, vetActualizado).subscribe({
            next: (resultado) => {
              observer.next(resultado);
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }

  //Para actualizar solo el estado (activo/inactivo)
  updateEstado(id: number, estado: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { activo: estado });
  }


  //Observable para eliminar un veterinario
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}