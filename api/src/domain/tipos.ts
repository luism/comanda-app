// Tipos del dominio de Comanda.
// Los montos son siempre pesos enteros (sin centavos).

export type Categoria = 'Pizzas' | 'Empanadas' | 'Bebidas' | 'Postres';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  disponible: boolean;
}

export type EstadoPedido = 'RECIBIDO' | 'EN_PREPARACION' | 'EN_CAMINO' | 'ENTREGADO' | 'CANCELADO';

export interface Cliente {
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface ItemPedido {
  productoId: number;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  numero: number;
  cliente: Cliente;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
  creadoEn: string; // ISO 8601
}
