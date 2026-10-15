// "$1.500": signo pegado, punto de miles, sin centavos (los montos son enteros).
export const formatoPesos = (monto: number) => `$${Math.round(monto).toLocaleString('es-AR')}`

export const formatoHora = (iso: string) =>
  new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
