import type { Categoria, Producto } from '../domain/tipos.js';
import type { Store } from './store.js';

export function crearProductosRepo(store: Store) {
  return {
    listarDisponibles(categoria?: Categoria): Producto[] {
      return store
        .leer()
        .productos.filter((p) => p.disponible && (!categoria || p.categoria === categoria));
    },
    buscarPorId(id: number): Producto | undefined {
      return store.leer().productos.find((p) => p.id === id);
    },
  };
}

export type ProductosRepo = ReturnType<typeof crearProductosRepo>;
