// Funciones compartidas por los hooks del pipeline SDD.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const raiz = process.env.CLAUDE_PROJECT_DIR || process.cwd()
export const rutaActiva = join(raiz, 'specs', 'ACTIVA')

/** Carpeta de la feature activa (ej. "specs/F2.2-pago-en-efectivo-con-vuelto") o null. */
export function featureActiva() {
  if (!existsSync(rutaActiva)) return null
  const carpeta = readFileSync(rutaActiva, 'utf8').trim()
  return carpeta && existsSync(join(raiz, carpeta)) ? carpeta : null
}

/** Lee el campo `estado:` del frontmatter de spec.md. */
export function estadoSpec(carpeta) {
  const ruta = join(raiz, carpeta, 'spec.md')
  if (!existsSync(ruta)) return 'sin spec'
  return readFileSync(ruta, 'utf8').match(/^estado:\s*(\w+)/m)?.[1] ?? 'sin estado'
}

export const existe = (carpeta, archivo) => existsSync(join(raiz, carpeta, archivo))
