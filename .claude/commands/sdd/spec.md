---
description: Paso 2 del pipeline SDD. Convierte la feature activa en una especificación verificable (spec.md)
argument-hint: (sin argumentos, usa la feature activa)
---

Leé `specs/ACTIVA` para saber cuál es la feature en curso. Si no existe, pedí que se corra `/sdd:leer <ID>` primero y pará.

Delegá el trabajo al subagente **analista-specs**. Pasale la ruta de la carpeta de la feature y pedile que escriba `spec.md` en esa carpeta siguiendo la plantilla del skill `metodo-sdd`.

Cuando termine:
1. Mostrá la tabla de escenarios de aceptación (ID, historia, una línea de qué verifica).
2. Mostrá las preguntas abiertas que dejó el analista, si las hay.
3. Recordá que la spec quedó en estado `borrador` y que **una persona** tiene que revisarla y aprobarla con `/sdd:aprobar` antes de seguir. No la apruebes vos.
