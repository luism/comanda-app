import { Router } from 'express';
import type { Categoria } from '../domain/tipos.js';
import type { ProductosRepo } from '../repositories/productos.repo.js';

// F1.1 · Ver el menú
export function productosRouter(productos: ProductosRepo) {
  const r = Router();
  r.get('/', (req, res) => {
    const categoria = req.query.categoria as Categoria | undefined;
    res.json(productos.listarDisponibles(categoria));
  });
  return r;
}
