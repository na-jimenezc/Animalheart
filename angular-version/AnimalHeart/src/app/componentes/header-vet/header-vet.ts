import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-vet',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-vet.html',
  styleUrl: './header-vet.css'
})
export class HeaderVet {
  @Input() veterinario: { nombre: string; especialidad?: string } | null = null;
  @Input() error: string | null = null;
}