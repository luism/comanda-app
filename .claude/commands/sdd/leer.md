---
description: Paso 1 del pipeline SDD. Lee una feature de Trello y la deja en specs/<ID>/feature.md
argument-hint: <ID de la feature, ej. F2.2> [--offline]
allowed-tools: Bash(node scripts/trello-leer.mjs *), Read, Edit(./specs/**)
---

Vamos a empezar a trabajar la feature **$ARGUMENTS** con el pipeline SDD.

1. Corré `node scripts/trello-leer.mjs $ARGUMENTS`. Si falla por red, avisá y probá agregando `--offline`.
2. El script imprime en qué carpeta guardó el archivo. Escribí esa ruta (por ejemplo `specs/F2.2-pago-en-efectivo-con-vuelto`) como única línea en `specs/ACTIVA`. Ese archivo marca cuál es la feature en curso.
3. Leé el `feature.md` generado y presentá un resumen corto:
   - épica a la que pertenece y de qué depende,
   - las historias de usuario (ID y una línea cada una),
   - cantidad de criterios de aceptación por historia,
   - cualquier cosa ambigua o contradictoria que ya se vea en la tarjeta.
4. Terminá diciendo que el próximo paso es `/sdd:spec`.

No escribas spec, plan ni código en este paso. No modifiques `feature.md`.
