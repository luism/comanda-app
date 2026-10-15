---
description: Puerta humana del pipeline SDD. Marca la spec de la feature activa como aprobada
argument-hint: [nombre de quien aprueba]
disable-model-invocation: true
allowed-tools: Read, Edit(./specs/**)
---

Leé `specs/ACTIVA` y abrí el `spec.md` de esa carpeta.

1. Si la sección "Preguntas abiertas" tiene preguntas, listalas con su propuesta y preguntá si se aprueban así. No sigas hasta tener una respuesta. Si la persona cambia alguna, actualizá la spec con su decisión. Al aprobar, marcá cada pregunta como `[x]` con la decisión tomada.
2. Si se confirma, editá **solo el frontmatter** de `spec.md`:
   - `estado: aprobada`
   - `aprobada_por: $ARGUMENTS` (si no se pasó nombre, poné "docente")
   - `fecha:` con la fecha de hoy en formato AAAA-MM-DD
3. Confirmá en una línea y decí que el próximo paso es `/sdd:plan`.

Este comando lo dispara siempre una persona. Claude no lo ejecuta por su cuenta.
