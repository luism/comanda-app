import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import Carrito from '../components/Carrito'
import { api, ApiError } from '../lib/api'
import { useCarrito } from '../lib/carrito'
import type { Cliente } from '../lib/tipos'

type Errores = Partial<Record<keyof Cliente, string>>

// F2.1 · HU-06: validación en el navegador (la API vuelve a validar).
function validar(c: Cliente): Errores {
  const e: Errores = {}
  if (!c.nombre.trim()) e.nombre = 'El nombre es obligatorio'
  if (!c.telefono.trim()) e.telefono = 'El teléfono es obligatorio'
  else if (!/^[0-9 +-]+$/.test(c.telefono) || c.telefono.replace(/\D/g, '').length < 8) e.telefono = 'Teléfono inválido'
  if (!c.direccion.trim()) e.direccion = 'La dirección es obligatoria'
  return e
}

export default function Checkout() {
  const { lineas, vaciar } = useCarrito()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState<Cliente>({ nombre: '', telefono: '', direccion: '' })
  const [errores, setErrores] = useState<Errores>({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  const cambiar = (campo: keyof Cliente) => (e: ChangeEvent<HTMLInputElement>) =>
    setCliente({ ...cliente, [campo]: e.target.value })

  async function confirmar(e: FormEvent) {
    e.preventDefault()
    const errs = validar(cliente)
    setErrores(errs)
    if (Object.keys(errs).length > 0) return

    setEnviando(true)
    setErrorGeneral('')
    try {
      const pedido = await api.crearPedido({
        cliente,
        items: lineas.map((l) => ({ productoId: l.producto.id, cantidad: l.cantidad })),
      })
      vaciar()
      navigate(`/pedido/${pedido.id}`)
    } catch (err) {
      setErrorGeneral(err instanceof ApiError ? err.message : 'No pudimos enviar el pedido')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="grilla-menu">
      <section>
        <h1>Datos de entrega</h1>
        <form className="tarjeta formulario" onSubmit={confirmar} noValidate>
          <Campo label="Nombre" error={errores.nombre}>
            <input value={cliente.nombre} onChange={cambiar('nombre')} autoComplete="name" />
          </Campo>
          <Campo label="Teléfono" error={errores.telefono}>
            <input value={cliente.telefono} onChange={cambiar('telefono')} inputMode="tel" placeholder="381 555-1234" />
          </Campo>
          <Campo label="Dirección" error={errores.direccion}>
            <input value={cliente.direccion} onChange={cambiar('direccion')} autoComplete="street-address" />
          </Campo>

          <div className="pago">
            <strong>Forma de pago</strong>
            <p>Efectivo, contra entrega.</p>
          </div>

          {errorGeneral && <p className="alerta">{errorGeneral}</p>}
          <button className="boton boton--primario boton--ancho" disabled={lineas.length === 0 || enviando}>
            {enviando ? 'Enviando…' : 'Confirmar pedido'}
          </button>
        </form>
      </section>
      <Carrito conBoton={false} />
    </div>
  )
}

function Campo({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className={error ? 'campo campo--error' : 'campo'}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  )
}
