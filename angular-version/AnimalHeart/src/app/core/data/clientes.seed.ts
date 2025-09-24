import { Cliente } from '../models/cliente.model';

export const CLIENTES_SEED: Cliente[] = [
  {
    id: 'c1',
    cedula: '123456789',
    nombre: 'Carlos Ruiz',
    correo: 'carlos@gmail.com',
    celular: '3214567890',
  },

  {
    id: 'c2',
    cedula: '987654321',
    nombre: 'Lucía Gómez',
    correo: 'lucia@gmail.com',
    celular: '3101234567',
  },
  {
    id: 'c3',
    cedula: '456789123',
    nombre: 'Mateo Torres',
    correo: 'mateo@gmail.com',
    celular: '3149876543',
  },
];