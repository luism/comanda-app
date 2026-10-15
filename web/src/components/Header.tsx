import { Link, NavLink } from 'react-router'
import { useCarrito } from '../lib/carrito'

export default function Header() {
  const { cantidadTotal } = useCarrito()
  return (
    <header className="header">
      <div className="contenedor header__fila">
        <Link to="/" className="logo">
          Comanda<span>.</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Menú
          </NavLink>
          <NavLink to="/checkout">Carrito ({cantidadTotal})</NavLink>
        </nav>
      </div>
    </header>
  )
}
