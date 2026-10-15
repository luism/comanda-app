import { randomUUID } from 'node:crypto';
import type { Pedido } from '../domain/tipos.js';
import type { Store } from './store.js';

export function crearPedidosRepo(store: Store) {
  return {
    /** Guarda un pedido nuevo asignándole id y número correlativo. */
    crear(datos: Omit<Pedido, 'id' | 'numero'>): Pedido {
      const db = store.leer();
      const pedido: Pedido = { id: randomUUID(), numero: db.ultimoNumero + 1, ...datos };
      db.ultimoNumero = pedido.numero;
      db.pedidos.push(pedido);
      store.guardar(db);
      return pedido;
    },
    buscarPorId(id: string): Pedido | undefined {
      return store.leer().pedidos.find((p) => p.id === id);
    },
    listar(): Pedido[] {
      return store.leer().pedidos;
    },
    actualizar(pedido: Pedido): Pedido {
      const db = store.leer();
      const i = db.pedidos.findIndex((p) => p.id === pedido.id);
      if (i === -1) throw new Error(`Pedido ${pedido.id} no existe`);
      db.pedidos[i] = pedido;
      store.guardar(db);
      return pedido;
    },
  };
}

export type PedidosRepo = ReturnType<typeof crearPedidosRepo>;
