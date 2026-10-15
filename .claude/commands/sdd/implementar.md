---
description: Paso 5 del pipeline SDD. Implementa las tareas pendientes de la feature activa, con tests primero
argument-hint: [T3 | T1-T4 | vacío para todas]
---

Leé `specs/ACTIVA` y de esa carpeta `spec.md`, `plan.md` y `tareas.md`.

Delegá al subagente **desarrollador** con estas instrucciones:
- Carpeta de la feature y tareas a ejecutar: `$ARGUMENTS` (si está vacío, todas las que no estén marcadas).
- Para cada tarea: escribir primero el test que corresponde al escenario de la spec, verlo fallar, implementar lo mínimo para que pase, correr `npm run check`.
- Marcar la tarea como `[x]` en `tareas.md` recién cuando `npm run check` da verde.
- Si algo de la spec no se puede cumplir o el plan está mal, frenar y explicar. No cambiar la spec por su cuenta.

Cuando el subagente termine, mostrá: tareas completadas, tests nuevos (nombre de cada uno) y el resultado final de `npm run check`. Próximo paso: `/sdd:verificar`.
