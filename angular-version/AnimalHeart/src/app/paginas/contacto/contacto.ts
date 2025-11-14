import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  contactData = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  };

  mensajeExito: string = '';
  mensajeError: string = '';
  enviando: boolean = false;

  private apiUrl = 'http://localhost:8080/api/contacto';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    console.log('onSubmit ejecutado');
    console.log('Datos a enviar:', this.contactData);
    console.log('URL:', this.apiUrl);

    if (this.enviando) return;

    this.enviando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    console.log('Enviando petición HTTP...');

    this.http.post<any>(this.apiUrl, this.contactData).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.enviando = false;

        if (response.status === 'ok') {
          this.mensajeExito = response.mensaje;

          setTimeout(() => {
            this.resetFormData();
            this.cdr.detectChanges();
          }, 2000);

          setTimeout(() => {
            this.mensajeExito = '';
            this.cdr.detectChanges();
          }, 5000);

        } else {
          this.mensajeError = 'Hubo un problema al enviar el mensaje.';
          this.cdr.detectChanges();
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        this.enviando = false;
        console.error('Error al enviar formulario:', error);

        this.mensajeError =
          error.error?.mensaje ||
          'Error al enviar el mensaje. Por favor intenta nuevamente.';

        setTimeout(() => {
          this.mensajeError = '';
          this.cdr.detectChanges();
        }, 5000);

        this.cdr.detectChanges();
      }
    });
  }

  resetForm(form: any) {
    form.reset();
    this.resetFormData();
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  private resetFormData() {
    this.contactData = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };
  }
}
