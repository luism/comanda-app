---
description: Paso 3 del pipeline SDD. Diseña cómo se implementa la spec aprobada (plan.md)
argument-hint: (sin argumentos, usa la feature activa)
---

Leé `specs/ACTIVA` y el `spec.md` de esa carpeta.

- Si el frontmatter no dice `estado: aprobada`, pará y explicá que falta la aprobación (`/sdd:aprobar`).
- Si está aprobada, delegá al subagente **arquitecto**: que lea la spec, recorra el código actual y escriba `plan.md` en la carpeta de la feature con la plantilla del skill `metodo-sdd`.

Cuando termine, mostrá:
1. La lista de archivos que se van a crear o modificar.
2. Los cambios al modelo de datos y al contrato de la API.
3. Las decisiones de diseño con su alternativa descartada.

Próximo paso: `/sdd:tareas`.
