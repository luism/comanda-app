import type { Producto } from '../domain/tipos.js';

export const PRODUCTOS_SEED: Producto[] = [
  { id: 1, nombre: 'Muzzarella', descripcion: 'Salsa de tomate, muzzarella y aceitunas', precio: 8500, categoria: 'Pizzas', disponible: true },
  { id: 2, nombre: 'Napolitana', descripcion: 'Muzzarella, tomate en rodajas, ajo y albahaca', precio: 9800, categoria: 'Pizzas', disponible: true },
  { id: 3, nombre: 'Fugazzeta', descripcion: 'Cebolla, muzzarella y orégano', precio: 9500, categoria: 'Pizzas', disponible: true },
  { id: 4, nombre: 'Calabresa', descripcion: 'Muzzarella y longaniza calabresa', precio: 10500, categoria: 'Pizzas', disponible: false },
  { id: 5, nombre: 'Empanada de carne', descripcion: 'Carne cortada a cuchillo, estilo tucumano', precio: 1200, categoria: 'Empanadas', disponible: true },
  { id: 6, nombre: 'Empanada de pollo', descripcion: 'Pollo, cebolla y morrón', precio: 1100, categoria: 'Empanadas', disponible: true },
  { id: 7, nombre: 'Empanada de humita', descripcion: 'Choclo, salsa blanca y queso', precio: 1100, categoria: 'Empanadas', disponible: true },
  { id: 8, nombre: 'Gaseosa 1,5 L', descripcion: 'Cola, lima-limón o naranja', precio: 3200, categoria: 'Bebidas', disponible: true },
  { id: 9, nombre: 'Agua sin gas 500 ml', descripcion: 'Agua mineral', precio: 1500, categoria: 'Bebidas', disponible: true },
  { id: 10, nombre: 'Flan casero', descripcion: 'Con dulce de leche', precio: 2800, categoria: 'Postres', disponible: true },
];
