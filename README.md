# Comanda · App de pedidos con pago contra entrega

MVP de una app de pedidos para un local de comidas: el cliente arma el pedido, deja sus datos y paga en efectivo cuando le llega. Es el proyecto de ejemplo para practicar **Spec-Driven Development (SDD)** con Claude Code en Taller Integrador II (UNSTA, 2026).

- Backlog en Trello: https://trello.com/b/9l2wJjtU/comanda-app-de-pedidos-demo-sdd
- Guía de la clase: [GUIA-DEMO.md](GUIA-DEMO.md)

## Requisitos

- Node.js 20 o superior (`node -v`)
- VS Code con la extensión **Claude Code** (o la CLI `claude`) con sesión iniciada
- Git

## Cómo levantarlo

```bash
npm install
npm run dev          # API en http://localhost:3001 · web en http://localhost:5173
npm run check        # typecheck + tests
```

## Estructura

```
comanda/
├── api/                 Express + TypeScript (rutas → servicios → repositorios)
├── web/                 React + Vite
├── specs/               un folder por feature: feature → spec → plan → tareas → verificación
├── backlog/             copia local del tablero de Trello (para trabajar sin internet)
├── scripts/             lector de Trello y utilidades
├── sdd.config.json      URL del tablero de Trello
├── CLAUDE.md            contexto del proyecto para Claude
└── .claude/
    ├── settings.json    permisos y hooks
    ├── commands/sdd/    /sdd:backlog, /sdd:leer, /sdd:spec, /sdd:aprobar, /sdd:plan,
    │                    /sdd:tareas, /sdd:implementar, /sdd:verificar, /sdd:todo
    ├── agents/          analista-specs, arquitecto, desarrollador, revisor-qa
    ├── skills/          metodo-sdd (con plantillas), lector-trello, convenciones-comanda
    └── hooks/           guardia-sdd (bloquea código sin spec aprobada), estado-sdd
```

## El pipeline SDD

```
Trello ──/sdd:leer──▶ feature.md ──/sdd:spec──▶ spec.md (borrador)
                                                   │
                                          /sdd:aprobar  ← una persona
                                                   ▼
        verificacion.md ◀──/sdd:verificar── código + tests ◀──/sdd:implementar── tareas.md ◀── plan.md
```

## Usar tu propio tablero

1. Copiá el tablero (en Trello: menú ⋯ → Copiar tablero) o armá uno con la misma convención de nombres: `E1 · …` para épicas y `F1.1 · …` para features.
2. Hacelo **público** (el script lo lee sin claves).
3. Pegá su URL en `sdd.config.json` → `trello.boardUrl`.
4. `node scripts/trello-leer.mjs --listar`
