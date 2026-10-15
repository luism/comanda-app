#!/usr/bin/env node
// Lee una feature del tablero de Trello y la deja como specs/<ID>-<slug>/feature.md
//
//   node scripts/trello-leer.mjs --listar          lista épicas y features con su columna
//   node scripts/trello-leer.mjs F2.2              baja la feature F2.2 a specs/
//   node scripts/trello-leer.mjs F2.2 --offline    usa backlog/trello-snapshot.json (sin internet)
//
// El tablero tiene que ser público: se lee <url-del-tablero>.json sin claves.
// Cada lectura online actualiza el snapshot, así la demo funciona aunque se caiga el wifi.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(readFileSync(join(raiz, 'sdd.config.json'), 'utf8'))
const rutaSnapshot = join(raiz, config.snapshot)

const args = process.argv.slice(2)
const offline = args.includes('--offline')
const listar = args.includes('--listar')
const id = args.find((a) => !a.startsWith('--'))?.toUpperCase()

if (!listar && !id) {
  console.error('Uso: node scripts/trello-leer.mjs <ID-feature> [--offline]   |   --listar')
  process.exit(1)
}

// ---------- 1. Obtener el tablero ----------

function urlJson(boardUrl) {
  const m = boardUrl.match(/trello\.com\/b\/([A-Za-z0-9]+)/)
  if (!m) throw new Error(`boardUrl inválida en sdd.config.json: ${boardUrl}`)
  return `https://trello.com/b/${m[1]}.json`
}

async function descargar(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    // Plan B: curl respeta los proxies del sistema (redes de facultad, empresas).
    try {
      return JSON.parse(execFileSync('curl', ['-sfL', url], { encoding: 'utf8', maxBuffer: 50e6 }))
    } catch {
      throw new Error(`No pude leer ${url} (${err.message}). ¿El tablero es público? Probá con --offline.`)
    }
  }
}

function normalizar(board) {
  const listas = new Map(board.lists.filter((l) => !l.closed).map((l) => [l.id, l.name]))
  return {
    tablero: board.name,
    url: board.url,
    leidoEn: new Date().toISOString(),
    tarjetas: board.cards
      .filter((c) => !c.closed && listas.has(c.idList))
      .map((c) => ({ nombre: c.name, lista: listas.get(c.idList), url: c.shortUrl, descripcion: c.desc })),
  }
}

let datos
if (offline) {
  if (!existsSync(rutaSnapshot)) throw new Error(`No existe ${config.snapshot}. Corré una vez sin --offline.`)
  datos = JSON.parse(readFileSync(rutaSnapshot, 'utf8'))
  console.log(`(offline) usando snapshot del ${datos.leidoEn}`)
} else {
  datos = normalizar(await descargar(urlJson(config.trello.boardUrl)))
  mkdirSync(dirname(rutaSnapshot), { recursive: true })
  writeFileSync(rutaSnapshot, JSON.stringify(datos, null, 2) + '\n')
}

// ---------- 2. Interpretar las tarjetas ----------
// Convención de nombres: "E2 · Título" para épicas, "F2.2 · Título" para features.

const codigo = (nombre) => nombre.match(/^([EF]\d+(?:\.\d+)?)\s*[·\-:]\s*/)?.[1]?.toUpperCase()
const titulo = (nombre) => nombre.replace(/^([EF]\d+(?:\.\d+)?)\s*[·\-:]\s*/, '').trim()
const slug = (txt) =>
  txt.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const tarjetas = datos.tarjetas.map((t) => ({ ...t, codigo: codigo(t.nombre), titulo: titulo(t.nombre) }))

if (listar) {
  console.log(`\nTablero: ${datos.tablero}\n`)
  for (const t of tarjetas.filter((t) => t.codigo).sort((a, b) => a.codigo.localeCompare(b.codigo, 'es', { numeric: true }))) {
    const esEpica = t.codigo.startsWith('E')
    const depende = t.descripcion.match(/\*\*Depende de:\*\*\s*([^\n]+)/)?.[1]?.trim()
    const extra = !esEpica && depende && depende !== '—' ? `  depende de ${depende}` : ''
    console.log(`${esEpica ? '' : '   '}${t.codigo.padEnd(6)} ${t.titulo.padEnd(40)} [${t.lista}]${extra}`)
  }
  console.log('')
  process.exit(0)
}

const feature = tarjetas.find((t) => t.codigo === id)
if (!feature) {
  console.error(`No encontré la tarjeta ${id}. Usá --listar para ver las disponibles.`)
  process.exit(1)
}

const codigoEpica = feature.descripcion.match(/\*\*Épica:\*\*\s*(E\d+)/)?.[1]
const epica = codigoEpica ? tarjetas.find((t) => t.codigo === codigoEpica) : undefined
const historias = [...feature.descripcion.matchAll(/^###\s+(HU-\d+)/gm)].map((m) => m[1])
const criterios = (feature.descripcion.match(/^- /gm) ?? []).length

// ---------- 3. Escribir specs/<ID>-<slug>/feature.md ----------

const carpeta = join(raiz, config.specsDir, `${feature.codigo}-${slug(feature.titulo)}`)
mkdirSync(carpeta, { recursive: true })

const md = `---
id: ${feature.codigo}
titulo: ${feature.titulo}
epica: ${epica ? `${epica.codigo} · ${epica.titulo}` : '—'}
trello: ${feature.url}
columna: ${feature.lista}
leido: ${datos.leidoEn}
---

<!-- ARCHIVO GENERADO desde Trello con scripts/trello-leer.mjs. No editar a mano:
     si la feature cambia, se cambia en Trello y se vuelve a leer. -->

# ${feature.codigo} · ${feature.titulo}

${feature.descripcion.trim()}
${epica ? `\n---\n\n## Contexto de la épica (${epica.codigo} · ${epica.titulo})\n\n${epica.descripcion.trim()}\n` : ''}`

writeFileSync(join(carpeta, 'feature.md'), md)

const rel = carpeta.replace(raiz + '/', '').replaceAll('\\', '/')
console.log(`\n✔ ${feature.codigo} · ${feature.titulo}`)
console.log(`  Épica:      ${epica ? `${epica.codigo} · ${epica.titulo}` : '—'}`)
console.log(`  Columna:    ${feature.lista}`)
console.log(`  Historias:  ${historias.join(', ') || '—'}`)
console.log(`  Ítems de criterios/notas: ${criterios}`)
console.log(`  Guardado en ${rel}/feature.md\n`)
