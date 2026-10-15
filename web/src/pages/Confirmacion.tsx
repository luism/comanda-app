import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { api } from '../lib/api'
import { formatoPesos } from '../lib/formato'
import type { Pedido } from '../lib/tipos'

// F2.1 · HU-07: pantalla de confirmación con el número de pedido.
export default function Confirmacion() {
  const { id } = useParams()
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) api.pedido(id).then(setPedido).catch(() => setError('No encontramos ese pedido'))
  }, [id])

  if (error) return <p className="alerta">{error}</p>
  if (!pedido) return <p>Cargando…</p>

  return (
    <section className="tarjeta confirmacion">
      <p className="etiqueta">Pedido confirmado</p>
      <h1>N.º {pedido.numero}</h1>
      <p>
        Gracias, {pedido.cliente.nombre}. Lo llevamos a <strong>{pedido.cliente.direccion}</strong>.
      </p>
      <ul className="detalle">
        {pedido.items.map((i) => (
          <li key={i.productoId}>
            <span>
              {i.cantidad} × {i.nombre}
            </span>
            <span>{formatoPesos(i.subtotal)}</span>
          </li>
        ))}
        <li className="detalle__total">
          <span>Total a pagar en efectivo</span>
          <strong>{formatoPesos(pedido.total)}</strong>
        </li>
      </ul>
      <Link to="/" className="boton">
        Hacer otro pedido
      </Link>
    </section>
  )
}
