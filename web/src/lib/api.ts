import type { Cliente, Pedido, Producto } from './tipos'

export class ApiError extends Error {
  status: number
  detalles?: Record<string, string[]>
  constructor(status: number, message: string, detalles?: Record<string, string[]>) {
    super(message)
    this.status = status
    this.detalles = detalles
  }
}

async function pedir<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(res.status, body.error ?? 'Error inesperado', body.detalles)
  return body as T
}

export const api = {
  productos: () => pedir<Producto[]>('/api/productos'),

  crearPedido: (datos: { cliente: Cliente; items: { productoId: number; cantidad: number }[] }) =>
    pedir<Pedido>('/api/pedidos', { method: 'POST', body: JSON.stringify(datos) }),

  pedido: (id: string) => pedir<Pedido>(`/api/pedidos/${id}`),
}
