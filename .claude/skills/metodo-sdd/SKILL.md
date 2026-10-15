---
name: metodo-sdd
description: Método de Spec-Driven Development de este proyecto. Artefactos (feature, spec, plan, tareas, verificación), reglas de trazabilidad y plantillas. Usar al escribir o revisar cualquier archivo dentro de specs/ o al implementar una feature del backlog.
---

# Spec-Driven Development en Comanda

La idea central: **la especificación es la fuente de verdad y el código se deriva de ella**. Nadie, ni persona ni IA, escribe código de una feature sin una spec aprobada por una persona.

## El pipeline

| Paso | Comando | Quién | Entra | Sale |
|---|---|---|---|---|
| 1. Leer | `/sdd:leer F2.2` | script | tarjeta de Trello | `feature.md` (solo lectura) |
| 2. Especificar | `/sdd:spec` | analista-specs | `feature.md` | `spec.md` en `borrador` |
| 3. Aprobar | `/sdd:aprobar` | **una persona** | `spec.md` | `spec.md` en `aprobada` |
| 4. Planificar | `/sdd:plan` | arquitecto | spec + código actual | `plan.md` |
| 5. Tareas | `/sdd:tareas` | Claude | spec + plan | `tareas.md` |
| 6. Implementar | `/sdd:implementar` | desarrollador | tareas | código + tests |
| 7. Verificar | `/sdd:verificar` | revisor-qa | todo lo anterior | `verificacion.md` |

Todo vive en `specs/<ID>-<slug>/`. El archivo `specs/ACTIVA` dice cuál es la feature en curso, y un hook bloquea cambios en `api/src`, `api/test` y `web/src` mientras esa spec no esté aprobada y no existan el plan y las tareas.

## Trazabilidad (la regla que más se evalúa)

```
HU-08 (Trello)  →  CA-08.1 (spec.md)  →  T2 (tareas.md)  →  it('CA-08.1: …') (test)  →  ✅ (verificacion.md)
```

- Cada criterio de aceptación de una historia se convierte en uno o más escenarios `CA-<historia>.<n>`.
- Cada escenario aparece en al menos una tarea.
- Cada escenario de la API tiene un test cuyo nombre empieza con su ID. Los de interfaz pueden tener prueba manual descrita.
- La verificación es una tabla escenario → evidencia → resultado.

## Plantillas

- [plantillas/spec.md](plantillas/spec.md)
- [plantillas/plan.md](plantillas/plan.md)
- [plantillas/tareas.md](plantillas/tareas.md)
- [plantillas/verificacion.md](plantillas/verificacion.md)

## Señales de una spec mala

- Escenarios sin valores concretos ("ingresa un monto válido").
- Reglas que dicen *cómo* implementar en vez de *qué* tiene que pasar ("usar un useState").
- Preguntas abiertas resueltas en silencio.
- Cosas que la tarjeta no pide y nadie marcó como `(propuesto)`.
