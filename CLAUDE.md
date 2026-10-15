# Comanda · App de pedidos (MVP)

App para que un local de comidas reciba pedidos por la web con **pago en efectivo contra entrega**. Es el proyecto de demostración del pipeline **SDD (Spec-Driven Development)** de Taller Integrador II (UNSTA, 2026).

## Regla número uno

**No se escribe código de una feature sin una spec aprobada por una persona.** El flujo es siempre:

`/sdd:leer <ID>` → `/sdd:spec` → `/sdd:aprobar` (humano) → `/sdd:plan` → `/sdd:tareas` → `/sdd:implementar` → `/sdd:verificar`

El método completo, las plantillas y la regla de trazabilidad están en el skill `metodo-sdd`. Un hook (`.claude/hooks/guardia-sdd.mjs`) bloquea cambios en `api/src`, `api/test` y `web/src` mientras la feature activa (`specs/ACTIVA`) no tenga la spec aprobada, el plan y las tareas.

## Stack

- `api/` — Express 5 + TypeScript (tsx), zod, persistencia en `api/data/db.json`. Tests con Vitest + supertest.
- `web/` — React 19 + Vite + react-router. Proxy de `/api` al puerto 3001.
- `scripts/trello-leer.mjs` — lee el backlog desde Trello (tablero en `sdd.config.json`).

Convenciones de código y arquitectura: skill `convenciones-comanda`.

## Comandos

```bash
npm install          # una vez, en la raíz
npm run dev          # API en :3001 + web en :5173
npm run check        # typecheck + tests. Una tarea está hecha cuando esto da verde
npm run demo-pedidos # carga 3 pedidos de ejemplo (con la API corriendo)
npm run reset-db     # vuelve la base a cero
```

## Estado del MVP

| Feature | Estado |
|---|---|
| F1.1 Ver el menú · F1.2 Carrito · F2.1 Datos de entrega | Hechas (proyecto base) |
| F2.2 Pago en efectivo con vuelto | Backlog |
| F3.1 Lista de pedidos del local | Backlog |
| F3.2 Avanzar el estado de un pedido | Backlog |
| F3.3 Seguimiento del pedido | Backlog |

Las features son chicas a propósito (una historia, tres criterios): cada una se recorre entera en clase.

## Reglas generales

- Todo en castellano: código, comentarios, textos de la interfaz y documentos.
- Montos en pesos enteros. Los calcula siempre el servidor.
- No agregar dependencias sin preguntar. No hacer `git push`.
- `specs/*/feature.md` no se edita: se regenera desde Trello.
