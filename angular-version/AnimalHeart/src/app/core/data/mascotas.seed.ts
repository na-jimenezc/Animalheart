import { Mascota, TipoMascota } from '../models/mascota.model';
import { CLIENTES_SEED } from './clientes.seed';

type RawMascota = Omit<Mascota, 'cliente'> & { clienteId: string };

const RAW_MASCOTAS: RawMascota[] = [
  {
    id: 'm1',
    nombre: 'Firulais',
    tipo: 'Perro' as TipoMascota,
    raza: 'Labrador',
    edad: 3,
    enfermedad: 'Ninguna',
    peso: 22,
    fotoUrl: '/assets/images/defaultPerro.jpg',
    activo: false,
    clienteId: 'c1',
  },
  {
    id: 'm2',
    nombre: 'Mishu',
    tipo: 'Gato' as TipoMascota,
    raza: 'Persa',
    edad: 2,
    enfermedad: 'Ninguna',
    peso: 5,
    fotoUrl: '/assets/images/defaultGato.png',
    activo: true,
    clienteId: 'c2',
  },
  {
    id: 'm3',
    nombre: 'Rocky',
    tipo: 'Perro' as TipoMascota,
    raza: 'Pastor Alemán',
    edad: 5,
    enfermedad: 'Ninguna',
    peso: 30,
    fotoUrl: '/assets/images/defaultPerro.jpg',
    activo: true,
    clienteId: 'c3',
  },
];

export const MASCOTAS_SEED: Mascota[] = RAW_MASCOTAS.map((m) => {
  const cliente = CLIENTES_SEED.find((c) => c.id === m.clienteId);
  if (!cliente) {
    throw new Error(
      `Seed inconsistente: no existe cliente con id ${m.clienteId} para mascota ${m.id}`
    );
  }
  const { clienteId, ...rest } = m;
  return { ...rest, cliente };
});
