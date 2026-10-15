// Hook SessionStart: lo que se imprime acá entra al contexto de Claude.
// Le cuenta en qué paso del pipeline quedó la feature activa.

import { estadoSpec, existe, featureActiva } from './sdd-comun.mjs'

const carpeta = featureActiva()
if (!carpeta) {
  console.log('Pipeline SDD: no hay feature activa. Para empezar: /sdd:backlog y después /sdd:leer <ID>.')
  process.exit(0)
}

const pasos = [
  ['feature.md', existe(carpeta, 'feature.md')],
  [`spec.md (${estadoSpec(carpeta)})`, existe(carpeta, 'spec.md')],
  ['plan.md', existe(carpeta, 'plan.md')],
  ['tareas.md', existe(carpeta, 'tareas.md')],
  ['verificacion.md', existe(carpeta, 'verificacion.md')],
]
console.log(`Pipeline SDD: feature activa en ${carpeta}`)
for (const [nombre, ok] of pasos) console.log(`  ${ok ? '[x]' : '[ ]'} ${nombre}`)
