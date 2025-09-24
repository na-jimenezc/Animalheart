import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-vet',
  imports: [CommonModule],
  templateUrl: './header-vet.html',
  styleUrl: './header-vet.css'
})
export class HeaderVet {
  @Input() veterinario: { nombre: string; especialidad?: string } | null = null;
  @Input() error: string | null = null;
}