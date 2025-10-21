import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-veterinarios-activos-inactivos',
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './veterinarios-activos-inactivos.html',
  styleUrl: './veterinarios-activos-inactivos.css'
})
export class VeterinariosActivosInactivos {
  @Input() activos: number = 0;
  @Input() inactivos: number = 0;
  @Input() loading: boolean = false;
}