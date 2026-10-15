import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import type { Pedido, Producto } from '../domain/tipos.js';
import { PRODUCTOS_SEED } from './seed.js';

// "Base de datos" del MVP: un archivo JSON. Alcanza para la demo y no requiere
// instalar nada. La capa de repositorios aísla este detalle: cambiar a
// PostgreSQL más adelante solo toca esta carpeta.

export interface Datos {
  productos: Producto[];
  pedidos: Pedido[];
  ultimoNumero: number;
}

export interface Store {
  leer(): Datos;
  guardar(datos: Datos): void;
}

export function datosIniciales(): Datos {
  return { productos: structuredClone(PRODUCTOS_SEED), pedidos: [], ultimoNumero: 1000 };
}

/** Store en memoria. Lo usan los tests: cada test arranca con datos limpios. */
export function crearStoreEnMemoria(inicial: Datos = datosIniciales()): Store {
  let datos = structuredClone(inicial);
  return {
    leer: () => structuredClone(datos),
    guardar: (nuevos) => {
      datos = structuredClone(nuevos);
    },
  };
}

/** Store en archivo JSON. Lo usa el servidor de desarrollo. */
export function crearStoreEnArchivo(ruta: string): Store {
  if (!existsSync(ruta)) {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, JSON.stringify(datosIniciales(), null, 2));
  }
  return {
    leer: () => JSON.parse(readFileSync(ruta, 'utf8')) as Datos,
    guardar: (datos) => writeFileSync(ruta, JSON.stringify(datos, null, 2)),
  };
}
