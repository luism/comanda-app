---
description: Paso 4 del pipeline SDD. Parte el plan en tareas chicas y ordenadas (tareas.md)
argument-hint: (sin argumentos, usa la feature activa)
allowed-tools: Read, Glob, Grep, Write(./specs/**)
---

Leé `specs/ACTIVA`, y de esa carpeta `spec.md` y `plan.md`. Si falta alguno, decí cuál y pará.

Usando la plantilla `tareas.md` del skill `metodo-sdd`, escribí `tareas.md` en la carpeta de la feature:

- Tareas de 5 a 15 minutos cada una, numeradas T1, T2, …
- Primero dominio y API con sus tests, después frontend, al final la verificación.
- Cada tarea dice qué escenarios de la spec cubre (`[CA-08.1]`) y cuándo se considera hecha.
- Todos los escenarios de aceptación de la spec tienen que aparecer en al menos una tarea. Si alguno queda afuera, avisá.

Mostrá la lista de tareas y decí que el próximo paso es `/sdd:implementar`.
