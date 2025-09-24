import { Tratamiento } from '../models/tratamiento.model';

export const TRATAMIENTOS_SEED: Tratamiento[] = [
  {
    id: 't1',
    fecha: new Date(),
    cantidadUsada: 2,
    mascotaId: 'm1',
    medicamentoId: 'm1',
    veterinarioId: 'v1',
  },
  {
    id: 't2',
    fecha: new Date(Date.now() - 86400000), // ayer
    cantidadUsada: 1,
    mascotaId: 'm2',
    medicamentoId: 'm2',
    veterinarioId: 'v2',
  },
];
