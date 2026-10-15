---
name: lector-trello
description: Cómo leer el backlog del proyecto desde Trello (épicas, features e historias de usuario) y cuáles son las convenciones de las tarjetas. Usar cuando se pregunte por el backlog, por una feature por su ID (F1.1, F2.2…) o por el estado de una tarjeta.
allowed-tools: Bash(node scripts/trello-leer.mjs *)
---

# Leer el backlog desde Trello

El tablero está configurado en `sdd.config.json` (`trello.boardUrl`). Tiene que ser **público**: el script lee `https://trello.com/b/<id>.json`, que no necesita claves.

## Comandos

```bash
node scripts/trello-leer.mjs --listar            # épicas y features con su columna
node scripts/trello-leer.mjs F2.2                # baja la feature a specs/F2.2-<slug>/feature.md
node scripts/trello-leer.mjs F2.2 --offline      # usa backlog/trello-snapshot.json
```

Cada lectura online actualiza `backlog/trello-snapshot.json`. Si en clase se corta internet, `--offline` lee la última copia.

## Convenciones de las tarjetas

- Nombre: `E<n> · Título` para épicas, `F<n>.<m> · Título` para features.
- Columnas: Épicas · Backlog (Features) · En desarrollo (SDD) · Hecho.
- Descripción de una feature:

```markdown
**Épica:** E2 · Checkout con pago contra entrega
**Prioridad:** Must · **Estimación:** 3 pts
**Depende de:** F2.1

## Historias de usuario

### HU-08 · Título
Como <rol> quiero <acción> para <beneficio>.

**Criterios de aceptación**
- Dado …, cuando …, entonces …
```

## Si hay un conector de Trello disponible

Si en la sesión existen herramientas de Trello (conector de claude.ai o un servidor MCP), se pueden usar para **escribir**: mover la tarjeta a "En desarrollo" al empezar y a "Hecho" al cerrar, y dejar como comentario el resumen de `verificacion.md`. Para **leer**, usar siempre el script: así el `feature.md` queda en el repositorio y versionado.
