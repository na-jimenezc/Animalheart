import { Tratamiento } from '../models/tratamiento.model';
import { MASCOTAS_SEED } from './mascotas.seed';
import { MEDICAMENTOS_SEED } from './medicamentos.seed';
import { VETERINARIOS_SEED } from './veterinarios.seed';

type RawTratamiento = {
  id?: string;
  fecha: Date | string;
  cantidadUsada: number;
  mascotaId: string;
  medicamentoId: string;
  veterinarioId: string;
};

const RAW_TRATAMIENTOS: RawTratamiento[] = [
  // { id: 't1', fecha: '2025-08-12', cantidadUsada: 2, mascotaId: 'm1', medicamentoId: 'md1', veterinarioId: 'v1' },
];

export const TRATAMIENTOS_SEED: Tratamiento[] = RAW_TRATAMIENTOS.map(t => {
  const mascota = MASCOTAS_SEED.find(m => m.id === t.mascotaId);
  const medicamento = MEDICAMENTOS_SEED.find(md => md.id === t.medicamentoId);
  const veterinario = VETERINARIOS_SEED.find(v => v.id === t.veterinarioId);

  if (!mascota || !medicamento || !veterinario) {
    const missing = [
      !mascota ? `mascotaId=${t.mascotaId}` : null,
      !medicamento ? `medicamentoId=${t.medicamentoId}` : null,
      !veterinario ? `veterinarioId=${t.veterinarioId}` : null,
    ].filter(Boolean).join(', ');
    throw new Error(`Seed inconsistente en tratamiento ${t.id ?? '(sin id)'}: faltan ${missing}`);
  }

  const fecha = t.fecha instanceof Date ? t.fecha : new Date(t.fecha);

  return {
    id: t.id,
    fecha,
    cantidadUsada: t.cantidadUsada,
    mascota,
    medicamento,
    veterinario,
  };
});
