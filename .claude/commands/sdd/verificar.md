---
description: Paso 6 del pipeline SDD. Revisa que cada escenario de la spec tenga evidencia y deja verificacion.md
argument-hint: (sin argumentos, usa la feature activa)
---

Leé `specs/ACTIVA`.

Delegá al subagente **revisor-qa**. No vio cómo se escribió el código, así que su revisión es independiente. Pedile que:
1. Corra `npm run check`.
2. Arme la matriz de trazabilidad: cada escenario de `spec.md` → test que lo prueba → resultado.
3. Revise el diff contra la spec y el plan, buscando reglas de negocio que falten o cosas implementadas que la spec no pedía.
4. Escriba `verificacion.md` en la carpeta de la feature con el veredicto: APROBADA u OBSERVADA.

Si el revisor dejó escenarios de interfaz como "probar en la demo", mostrá sus pasos de prueba numerados y pedí a la persona que los pruebe en el navegador (la app ya está corriendo con `npm run dev`). Esperá su respuesta. Con lo que te diga, actualizá esos renglones de la matriz en `verificacion.md` (✅ o ❌) y ajustá el veredicto.

Mostrá la matriz final y el veredicto.

Si el veredicto es APROBADA:
- Proponé un mensaje de commit con el formato `feat(<ID>): <título>` y la lista de historias cubiertas. No hagas el commit sin que te lo pidan.
- Si tenés disponibles herramientas de Trello (conector o MCP), ofrecé mover la tarjeta a "Hecho" y dejar un comentario con el resumen. Si no, mostrá el texto del comentario para copiarlo a mano.
- Al cerrar, borrá el contenido de `specs/ACTIVA` (dejalo vacío) para liberar la guardia.

Si es OBSERVADA, listá qué falta y sugerí volver a `/sdd:implementar` con las tareas que correspondan.
