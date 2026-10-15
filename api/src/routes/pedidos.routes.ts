import { Router } from 'express';
import type { PedidosService } from '../services/pedidos.service.js';

// F2.1 · Datos de entrega y confirmación
export function pedidosRouter(service: PedidosService) {
  const r = Router();

  r.post('/', (req, res) => {
    const pedido = service.crear(req.body);
    res.status(201).json(pedido);
  });

  r.get('/:id', (req, res) => {
    res.json(service.obtener(req.params.id));
  });

  return r;
}
