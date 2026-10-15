---
name: convenciones-comanda
description: Arquitectura, estructura de carpetas y convenciones de código de Comanda (API Express + TypeScript, frontend React + Vite). Usar al planificar o escribir código en api/ o web/.
---

# Convenciones de Comanda

## Arquitectura de la API (en capas)

```
routes/        HTTP: lee req, llama al servicio, responde. Sin reglas de negocio.
services/      Reglas de negocio y validación (zod). Lanza HttpError.
repositories/  Acceso a datos. Hoy un JSON (store.ts); mañana PostgreSQL.
domain/        Tipos y errores. No importa nada de las otras capas.
```

- `crearApp(store)` en `app.ts` arma todo. Los tests usan `crearStoreEnMemoria()` para arrancar limpios.
- Errores: `throw badRequest(msg)`, `notFound(msg)`, `conflict(msg)` desde `domain/errores.ts`. El middleware responde `{ "error": "<mensaje>", "detalles": … }`.
- Códigos: 201 al crear, 400 datos inválidos, 404 no existe, 409 la operación choca con el estado actual (por ejemplo, una transición de estado no permitida).
- Validación de entrada con `zod` en el servicio. Mensajes en castellano, iguales a los que pide la spec.
- **Montos en pesos enteros** (`number`, sin centavos). El servidor calcula totales y vueltos; nunca confía en montos que manda el navegador.
- Importaciones con extensión `.js` (ESM de Node): `import { x } from './y.js'`.

## Tests

- Vitest + supertest en `api/test/`. Un archivo por recurso (`pedidos.test.ts`) o por feature si crece.
- `describe('<ID> · <Título>')` y cada `it` empieza con el ID del escenario: `it('CA-08.2: rechaza un monto menor al total', …)`.
- Helpers en `test/helpers.ts`: `appDePrueba()` y `clienteValido`.

## Frontend

- React 19 + Vite + `react-router`. Páginas en `web/src/pages/`, piezas reutilizables en `web/src/components/`.
- Llamadas a la API solo desde `web/src/lib/api.ts`. Tipos espejados en `web/src/lib/tipos.ts` (si cambia un tipo en la API, cambia acá también).
- Montos con `formatoPesos()` de `web/src/lib/formato.ts`.
- Estilos en `web/src/styles.css` con clases simples (`tarjeta`, `boton`, `boton--primario`, `campo`, `alerta`). No agregar librerías de UI.
- La validación del navegador es para dar feedback rápido; la API valida siempre de nuevo.

## Comandos

```bash
npm run dev        # API (3001) + web (5173) juntas
npm test           # tests de la API
npm run check      # typecheck de api y web + tests  ← la definición de "hecho"
npm run reset-db   # borra api/data/db.json
npm run demo-pedidos   # carga pedidos de ejemplo (con la API corriendo)
```

## Estilo

- Nombres de dominio en castellano (`pedido`, `cliente`, `pagaCon`, `vuelto`). Código y comentarios en castellano.
- Funciones chicas, sin clases salvo `HttpError`. Sin dependencias nuevas sin pedir permiso.
