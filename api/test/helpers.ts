import request from 'supertest';
import { crearApp } from '../src/app.js';
import { crearStoreEnMemoria } from '../src/repositories/store.js';

/** App con datos limpios para cada test. */
export function appDePrueba() {
  return request(crearApp(crearStoreEnMemoria()));
}

export const clienteValido = {
  nombre: 'Ana Pérez',
  telefono: '381 555-1234',
  direccion: 'San Martín 450, San Miguel de Tucumán',
};
