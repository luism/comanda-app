import { useEffect, useState } from 'react'
import Carrito from '../components/Carrito'
import { api } from '../lib/api'
import { useCarrito } from '../lib/carrito'
import { formatoPesos } from '../lib/formato'
import type { Categoria, Producto } from '../lib/tipos'

const CATEGORIAS: (Categoria | 'Todas')[] = ['Todas', 'Pizzas', 'Empanadas', 'Bebidas', 'Postres']

// F1.1 · Ver el menú
export default function Menu() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [filtro, setFiltro] = useState<Categoria | 'Todas'>('Todas')
  const [error, setError] = useState('')
  const { agregar } = useCarrito()

  useEffect(() => {
    api.productos().then(setProductos).catch(() => setError('No pudimos cargar el menú. ¿Está corriendo la API?'))
  }, [])

  const visibles = filtro === 'Todas' ? productos : productos.filter((p) => p.categoria === filtro)

  return (
    <div className="grilla-menu">
      <section>
        <h1>Menú</h1>
        <div className="filtros" role="group" aria-label="Filtrar por categoría">
          {CATEGORIAS.map((c) => (
            <button key={c} className={c === filtro ? 'chip chip--activo' : 'chip'} onClick={() => setFiltro(c)}>
              {c}
            </button>
          ))}
        </div>
        {error && <p className="alerta">{error}</p>}
        <ul className="productos">
          {visibles.map((p) => (
            <li key={p.id} className="tarjeta producto">
              <div>
                <span className="etiqueta">{p.categoria}</span>
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
              </div>
              <div className="producto__pie">
                <strong>{formatoPesos(p.precio)}</strong>
                <button className="boton" onClick={() => agregar(p)}>
                  Agregar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Carrito />
    </div>
  )
}
