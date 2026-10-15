// Carga pedidos de ejemplo en la API que está corriendo (útil para la demo del panel del local).
const API = process.env.API_URL ?? 'http://localhost:3001'

const pedidos = [
  { cliente: { nombre: 'Lucía Gómez', telefono: '381 412-3344', direccion: 'Laprida 820' }, items: [{ productoId: 1, cantidad: 1 }, { productoId: 8, cantidad: 1 }], pagaCon: 15000 },
  { cliente: { nombre: 'Martín Díaz', telefono: '381 455-9012', direccion: 'Av. Mate de Luna 2100' }, items: [{ productoId: 5, cantidad: 12 }], pagaCon: 20000 },
  { cliente: { nombre: 'Sofía Herrera', telefono: '381 600-1122', direccion: 'Santiago del Estero 330' }, items: [{ productoId: 2, cantidad: 1 }, { productoId: 3, cantidad: 1 }, { productoId: 10, cantidad: 2 }], pagaCon: 25000 },
]

for (const p of pedidos) {
  // pagaCon se ignora si la API todavía no implementa F2.2.
  const res = await fetch(`${API}/api/pedidos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
  const body = await res.json()
  console.log(res.ok ? `✔ Pedido ${body.numero} · ${p.cliente.nombre} · total ${body.total}` : `✘ ${res.status} ${body.error}`)
}
