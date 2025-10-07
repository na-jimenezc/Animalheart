import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-tratamientos-mes',
  templateUrl: './total-tratamientos-mes.html',
  styleUrls: ['./total-tratamientos-mes.css']
})
export class TotalTratamientosMes {
  @Input() totalTratamientos: number = 0;
  @Input() loading: boolean = false;
}