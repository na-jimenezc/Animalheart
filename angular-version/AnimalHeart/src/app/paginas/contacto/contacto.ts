import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule,CommonModule],
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

  onSubmit() {

    console.log('Datos del formulario:', this.contactData);

    this.mensajeExito = '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.';
    
    setTimeout(() => {
      this.mensajeExito = '';
    }, 5000);
  }

  resetForm(form: any) {
    form.reset();
    this.contactData = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };
  }
}