import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import type { Producto } from './tipos'

// F1.2 · Carrito de compras (estado solo en el navegador).

export interface LineaCarrito {
  producto: Producto
  cantidad: number
}

type Accion =
  | { tipo: 'agregar'; producto: Producto }
  | { tipo: 'sumar'; productoId: number }
  | { tipo: 'restar'; productoId: number }
  | { tipo: 'vaciar' }

function reducer(lineas: LineaCarrito[], accion: Accion): LineaCarrito[] {
  switch (accion.tipo) {
    case 'agregar': {
      const existe = lineas.some((l) => l.producto.id === accion.producto.id)
      return existe
        ? lineas.map((l) => (l.producto.id === accion.producto.id ? { ...l, cantidad: l.cantidad + 1 } : l))
        : [...lineas, { producto: accion.producto, cantidad: 1 }]
    }
    case 'sumar':
      return lineas.map((l) => (l.producto.id === accion.productoId ? { ...l, cantidad: l.cantidad + 1 } : l))
    case 'restar':
      return lineas
        .map((l) => (l.producto.id === accion.productoId ? { ...l, cantidad: l.cantidad - 1 } : l))
        .filter((l) => l.cantidad > 0)
    case 'vaciar':
      return []
  }
}

interface CarritoCtx {
  lineas: LineaCarrito[]
  total: number
  cantidadTotal: number
  agregar: (p: Producto) => void
  sumar: (id: number) => void
  restar: (id: number) => void
  vaciar: () => void
}

const Ctx = createContext<CarritoCtx | null>(null)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [lineas, dispatch] = useReducer(reducer, [])
  const valor = useMemo<CarritoCtx>(
    () => ({
      lineas,
      total: lineas.reduce((acc, l) => acc + l.producto.precio * l.cantidad, 0),
      cantidadTotal: lineas.reduce((acc, l) => acc + l.cantidad, 0),
      agregar: (producto) => dispatch({ tipo: 'agregar', producto }),
      sumar: (productoId) => dispatch({ tipo: 'sumar', productoId }),
      restar: (productoId) => dispatch({ tipo: 'restar', productoId }),
      vaciar: () => dispatch({ tipo: 'vaciar' }),
    }),
    [lineas],
  )
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useCarrito() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return ctx
}
