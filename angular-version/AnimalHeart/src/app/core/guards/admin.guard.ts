import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdministradorService } from '../services/administrador.service';

export const adminGuard: CanActivateFn = () => {
  const adminSvc = inject(AdministradorService);
  const router = inject(Router);
  const admin = adminSvc.getAdminFromStorage();
  if (admin) return true;
  router.navigate(['/admin/login']);
  return false;
};