import { Link } from 'react-router'
import { useCarrito } from '../lib/carrito'
import { formatoPesos } from '../lib/formato'

// F1.2 · HU-04 y HU-05
export default function Carrito({ conBoton = true }: { conBoton?: boolean }) {
  const { lineas, total, sumar, restar } = useCarrito()

  if (lineas.length === 0) {
    return (
      <aside className="tarjeta carrito">
        <h2>Tu pedido</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </aside>
    )
  }

  return (
    <aside className="tarjeta carrito">
      <h2>Tu pedido</h2>
      <ul className="carrito__lista">
        {lineas.map(({ producto, cantidad }) => (
          <li key={producto.id} className="carrito__linea">
            <div>
              <strong>{producto.nombre}</strong>
              <small>{formatoPesos(producto.precio * cantidad)}</small>
            </div>
            <div className="cantidad">
              <button aria-label={`Quitar uno de ${producto.nombre}`} onClick={() => restar(producto.id)}>
                −
              </button>
              <span>{cantidad}</span>
              <button aria-label={`Agregar uno de ${producto.nombre}`} onClick={() => sumar(producto.id)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="carrito__total">
        Total <strong>{formatoPesos(total)}</strong>
      </p>
      {conBoton && (
        <Link to="/checkout" className="boton boton--primario boton--ancho">
          Continuar
        </Link>
      )}
    </aside>
  )
}
