---
id: <F2.2>
titulo: <Título de la feature>
estado: borrador        # borrador | aprobada
aprobada_por:
fecha:
---

# Spec · <ID> · <Título>

## 1. Objetivo
<Dos o tres líneas: qué problema del usuario resuelve y para quién.>

## 2. Alcance
**Incluye**
- …

**No incluye**
- …

## 3. Reglas de negocio
- **RN-1**: <regla verificable, con valores concretos>
- **RN-2**: …

## 4. Escenarios de aceptación

| ID | Historia | Dado | Cuando | Entonces |
|---|---|---|---|---|
| CA-08.1 | HU-08 | un pedido con total $8.500 | el cliente indica que paga con $10.000 | ve "Vuelto: $1.500" |
| CA-08.2 | HU-08 | … | … | … |
| CA-08.5 (propuesto) | HU-08 | … | … | … |

## 5. Contrato de API

`<MÉTODO> /api/<ruta>`

Request:
```json
{ }
```

Respuesta exitosa (`<código>`):
```json
{ }
```

Errores:
| Código | Cuándo | Body |
|---|---|---|
| 400 | … | `{ "error": "…" }` |

## 6. Cambios en la interfaz
- Pantalla: <ruta> — <qué se agrega o cambia, con los textos exactos>

## 7. Preguntas abiertas
- [ ] <pregunta> — *Propuesta:* <interpretación sugerida>
