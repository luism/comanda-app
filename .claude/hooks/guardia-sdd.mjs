// Hook PreToolUse (Edit/Write): hace cumplir dos reglas del pipeline SDD.
//
//  1. feature.md viene de Trello y no se edita a mano.
//  2. No se toca código de la app (api/src, web/src, api/test) si la feature
//     activa no tiene la spec aprobada y el plan escrito.
//
// Salir con código 2 bloquea la herramienta y le muestra el mensaje a Claude.
// Para trabajar sin la guardia: borrar specs/ACTIVA (no hay feature en curso).

import { relative } from 'node:path'
import { estadoSpec, existe, featureActiva, raiz } from './sdd-comun.mjs'

let entrada = ''
for await (const trozo of process.stdin) entrada += trozo
const archivo = JSON.parse(entrada || '{}').tool_input?.file_path
if (!archivo) process.exit(0)

const rel = relative(raiz, archivo).replaceAll('\\', '/')

function bloquear(motivo) {
  console.error(`SDD: ${motivo}`)
  process.exit(2)
}

if (/^specs\/[^/]+\/feature\.md$/.test(rel)) {
  bloquear('feature.md se genera desde Trello. Si la feature cambió, actualizá la tarjeta y corré /sdd:leer de nuevo.')
}

if (/^(api\/src|api\/test|web\/src)\//.test(rel)) {
  const carpeta = featureActiva()
  if (carpeta) {
    const estado = estadoSpec(carpeta)
    if (estado !== 'aprobada') {
      bloquear(`la spec de ${carpeta} está en estado "${estado}". No se escribe código hasta que una persona la apruebe con /sdd:aprobar.`)
    }
    if (!existe(carpeta, 'plan.md') || !existe(carpeta, 'tareas.md')) {
      bloquear(`falta plan.md o tareas.md en ${carpeta}. Corré /sdd:plan y /sdd:tareas antes de implementar.`)
    }
  }
}

process.exit(0)
