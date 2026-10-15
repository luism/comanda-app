---
description: Corre el pipeline SDD completo para una feature, frenando en la aprobación humana de la spec
argument-hint: <ID de la feature, ej. F3.1>
---

Vamos a recorrer el pipeline SDD completo para **$ARGUMENTS**. Contá en una línea en qué paso estás antes de empezar cada uno.

1. **Leer**: corré `node scripts/trello-leer.mjs $ARGUMENTS`, escribí la carpeta resultante en `specs/ACTIVA` y resumí la feature.
2. **Especificar**: delegá al subagente **analista-specs** para que escriba `spec.md`.
3. **Aprobación humana**: mostrá los escenarios y las preguntas abiertas. **Frená acá** y pedí que una persona revise y corra `/sdd:aprobar`. No sigas hasta que el frontmatter de la spec diga `estado: aprobada`.
4. Cuando te digan que está aprobada, verificá el frontmatter y seguí con:
   - **Planificar**: subagente **arquitecto** → `plan.md`.
   - **Tareas**: `tareas.md` con la plantilla del skill `metodo-sdd`.
   - **Implementar**: subagente **desarrollador**, tarea por tarea, tests primero.
   - **Verificar**: subagente **revisor-qa** → `verificacion.md`.
5. Cerrá con la matriz de trazabilidad, el veredicto y el mensaje de commit propuesto.
