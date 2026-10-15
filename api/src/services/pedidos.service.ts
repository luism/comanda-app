import { z } from 'zod';
import { badRequest, notFound } from '../domain/errores.js';
import type { ItemPedido, Pedido } from '../domain/tipos.js';
import type { PedidosRepo } from '../repositories/pedidos.repo.js';
import type { ProductosRepo } from '../repositories/productos.repo.js';

// F2.1 · HU-06: datos de entrega obligatorios y teléfono válido.
export const crearPedidoSchema = z.object({
  cliente: z.object({
    nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
    telefono: z
      .string()
      .trim()
      .regex(/^[0-9 +-]+$/, 'Teléfono inválido')
      .refine((t) => t.replace(/\D/g, '').length >= 8, 'Teléfono inválido'),
    direccion: z.string().trim().min(1, 'La dirección es obligatoria'),
  }),
  items: z
    .array(
      z.object({
        productoId: z.number().int().positive(),
        cantidad: z.number().int().min(1).max(50),
      }),
    )
    .min(1, 'El pedido no tiene productos'),
});

export type CrearPedidoInput = z.infer<typeof crearPedidoSchema>;

export function crearPedidosService(pedidos: PedidosRepo, productos: ProductosRepo) {
  return {
    crear(body: unknown): Pedido {
      const parsed = crearPedidoSchema.safeParse(body);
      if (!parsed.success) {
        throw badRequest('Datos del pedido inválidos', z.flattenError(parsed.error).fieldErrors);
      }
      const { cliente, items } = parsed.data;

      // F2.1 · HU-07: el total lo calcula el servidor con los precios del catálogo.
      const lineas: ItemPedido[] = items.map(({ productoId, cantidad }) => {
        const producto = productos.buscarPorId(productoId);
        if (!producto || !producto.disponible) {
          throw badRequest(`El producto ${productoId} no existe o no está disponible`);
        }
        return {
          productoId,
          nombre: producto.nombre,
          precioUnitario: producto.precio,
          cantidad,
          subtotal: producto.precio * cantidad,
        };
      });
      const total = lineas.reduce((acc, l) => acc + l.subtotal, 0);

      return pedidos.crear({
        cliente,
        items: lineas,
        total,
        estado: 'RECIBIDO',
        creadoEn: new Date().toISOString(),
      });
    },

    obtener(id: string): Pedido {
      const pedido = pedidos.buscarPorId(id);
      if (!pedido) throw notFound('Pedido no encontrado');
      return pedido;
    },
  };
}

export type PedidosService = ReturnType<typeof crearPedidosService>;
