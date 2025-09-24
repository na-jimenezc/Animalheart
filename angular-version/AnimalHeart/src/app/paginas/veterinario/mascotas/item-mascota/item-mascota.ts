import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mascota } from '../../../../core/models/mascota.model';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-item-mascota',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-mascota.html',
  styleUrls: ['./item-mascota.css']
})
export class ItemMascota {
  @Input() mascota!: Mascota;
}
