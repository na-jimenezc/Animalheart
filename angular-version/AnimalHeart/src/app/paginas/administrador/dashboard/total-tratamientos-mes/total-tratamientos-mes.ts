import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-tratamientos-mes',
  templateUrl: './total-tratamientos-mes.html',
  styleUrls: ['./total-tratamientos-mes.css'],
  imports: [CommonModule],
  standalone: true,
})
export class TotalTratamientosMes {
  @Input() totalTratamientos: number = 0;
  @Input() loading: boolean = false;
}