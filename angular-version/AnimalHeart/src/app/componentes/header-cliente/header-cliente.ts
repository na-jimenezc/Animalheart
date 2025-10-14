import { Component, Output, EventEmitter, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-cliente.html',
  styleUrls: ['./header-cliente.css']
})
export class HeaderCliente implements OnInit {
  @Output() logout = new EventEmitter<void>();
  
  cliente: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && isPlatformBrowser(this.platformId)) {
      const raw = sessionStorage.getItem('cliente');
      this.cliente = raw ? JSON.parse(raw) : null;
    }
  }

  onLogout() {
    this.logout.emit();
  }
}