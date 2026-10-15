import express, { type ErrorRequestHandler } from 'express';
import { HttpError } from './domain/errores.js';
import { crearPedidosRepo } from './repositories/pedidos.repo.js';
import { crearProductosRepo } from './repositories/productos.repo.js';
import type { Store } from './repositories/store.js';
import { pedidosRouter } from './routes/pedidos.routes.js';
import { productosRouter } from './routes/productos.routes.js';
import { crearPedidosService } from './services/pedidos.service.js';

/** Arma la app con sus dependencias. Los tests le pasan un store en memoria. */
export function crearApp(store: Store) {
  const productos = crearProductosRepo(store);
  const pedidos = crearPedidosRepo(store);
  const pedidosService = crearPedidosService(pedidos, productos);

  const app = express();
  app.use(express.json());

  app.get('/api/salud', (_req, res) => res.json({ ok: true }));
  app.use('/api/productos', productosRouter(productos));
  app.use('/api/pedidos', pedidosRouter(pedidosService));

  const manejarErrores: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof HttpError) {
      res.status(err.status).json({ error: err.message, detalles: err.detalles });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  };
  app.use(manejarErrores);

  return app;
}
