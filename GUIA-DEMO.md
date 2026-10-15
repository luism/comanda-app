# Guía de la clase · Demo del pipeline SDD con Claude Code

**Proyecto:** Comanda, app de pedidos con pago en efectivo contra entrega.
**Duración:** 100 a 120 minutos.
**Objetivo de la clase:** que vean cómo una feature pasa de una tarjeta de Trello a código probado, con la especificación como fuente de verdad, y que entiendan qué hace cada pieza de la carpeta `.claude`.

---

## 0. Antes de la clase (15 min, en tu máquina)

```bash
unzip comanda.zip && cd comanda       # o git clone
npm install
npm run check                         # tiene que dar 9 tests en verde
npm run dev                           # dejarlo corriendo en una terminal aparte
```

- Abrí http://localhost:5173 y hacé un pedido de prueba para confirmar que anda.
- Abrí el tablero: https://trello.com/b/9l2wJjtU/comanda-app-de-pedidos-demo-sdd
- Abrí la carpeta en VS Code y el panel de Claude Code. La **primera vez** te pide confiar en la carpeta: aceptá, si no, ignora los permisos de `.claude/settings.json`.
- Corré `node scripts/trello-leer.mjs --listar` para dejar actualizada la copia offline del tablero.
- Si querés empezar limpio: `npm run reset-db`.

> **Tiempos de referencia** (medidos en un ensayo con Claude Code): leer ~10 s, spec ~1 min, plan ~1 min, tareas ~30 s, implementar 2 a 3 min, verificar ~1 min. Una feature completa entra en 15 a 20 minutos contando la discusión.
>
> **Plan B si se corta internet:** todos los comandos de lectura aceptan `--offline` y usan la copia del tablero en `backlog/trello-snapshot.json`. Claude Code sí necesita conexión.

---

## 1. Qué es SDD y por qué (10 min)

Ideas para la pizarra:

- **Vibe coding**: "che IA, haceme el pago en efectivo". Sale algo que compila, pero nadie sabe qué reglas cumple ni cómo probarlo.
- **SDD**: primero se escribe *qué* tiene que pasar, de forma verificable. Una persona lo aprueba. Recién ahí se planifica y se programa. Al final se verifica contra lo escrito.
- La IA es buena escribiendo código; lo difícil sigue siendo **decidir qué construir**. SDD pone la decisión humana en el lugar correcto.
- Conexión con lo que ya hicieron: TP1 (MVP) → TP2 (épicas, historias, criterios de aceptación). El pipeline arranca exactamente donde terminó el TP2.

```
Trello → feature.md → spec.md → [APROBACIÓN HUMANA] → plan.md → tareas.md → código + tests → verificacion.md
```

---

## 2. Recorrido del tablero (10 min)

Mostrar en Trello:

| Columna | Qué hay |
|---|---|
| 📚 Épicas | E1 Catálogo y Carrito · E2 Checkout contra entrega · E3 Gestión del local |
| 📋 Backlog | **F2.2** Pago en efectivo con vuelto · **F3.1** Lista de pedidos del local · F3.2 Avanzar estado · F3.3 Seguimiento |
| ✅ Hecho | F1.1 Menú · F1.2 Carrito · F2.1 Datos de entrega (ya están en el proyecto base) |

Abrir la tarjeta F2.2 y señalar: épica, dependencia, la historia en formato "Como… quiero… para…", criterios Dado/Cuando/Entonces con **valores concretos** ($8.500, $10.000, $1.500).

Remarcar el tamaño: **una historia, tres criterios**. Una feature que no entra en una clase se parte en Trello antes de empezar. (Contarles que en el ensayo una versión más grande de F2.2 generó 15 escenarios.)

Mostrar la app funcionando: menú → carrito → checkout. Remarcar que **todavía no se puede indicar con cuánto se paga**: eso es F2.2.

---

## 3. Recorrido de `.claude/` (15 min)

Abrir cada archivo en VS Code. Lo importante es la diferencia entre las piezas:

| Pieza | Archivo | Qué es | Cómo se activa |
|---|---|---|---|
| **Memoria del proyecto** | `CLAUDE.md` | Contexto que Claude lee siempre: stack, reglas, estado | Automático, al abrir la sesión |
| **Comandos** | `.claude/commands/sdd/*.md` | Un prompt guardado con nombre. Cada paso del pipeline es un comando | Lo escribe una persona: `/sdd:spec` |
| **Subagentes** | `.claude/agents/*.md` | Un "especialista" con su propio contexto, herramientas limitadas y rol. El analista no puede ejecutar comandos; el QA no vio cómo se escribió el código | Los invoca un comando o Claude cuando hace falta |
| **Skills** | `.claude/skills/*/SKILL.md` | Conocimiento empaquetado: el método SDD con sus plantillas, las convenciones del código, cómo leer Trello | Claude los carga cuando el tema es relevante; los subagentes los traen precargados |
| **Hooks** | `.claude/hooks/*.mjs` + `settings.json` | Código que corre **siempre**, sin depender de que la IA "se acuerde" | Eventos: al iniciar sesión, antes de editar un archivo |
| **Permisos** | `.claude/settings.json` | Qué puede hacer sin preguntar, qué tiene que preguntar, qué tiene prohibido | Siempre |

Frase para cerrar el bloque: *"Las instrucciones (CLAUDE.md, skills) son pedidos. Los hooks y los permisos son reglas que se cumplen aunque la IA se equivoque."*

---

## 4. Demo en vivo · Feature 1: F2.2 Pago en efectivo con vuelto (30 min)

En el panel de Claude Code, uno por uno:

### 4.1 Ver el backlog
```
/sdd:backlog
```
Muestra épicas y features con su columna y dependencias. Claude sugiere empezar por F2.2.

### 4.2 Leer la feature desde Trello
```
/sdd:leer F2.2
```
- Corre `scripts/trello-leer.mjs`, que baja la tarjeta y la épica y crea `specs/F2.2-pago-en-efectivo-con-vuelto/feature.md`.
- Escribe la carpeta en `specs/ACTIVA` (esto "enciende" la guardia).
- Mostrar el archivo generado. Se puede leer también sin Claude: `npm run leer-feature -- F2.2`.

### 4.3 ⚡ Momento didáctico: la guardia
Antes de seguir, pedile a Claude algo "atajo":
```
Agregá el campo pagaCon al tipo Pedido en api/src/domain/tipos.ts
```
El hook lo bloquea: *"SDD: la spec … está en estado "sin spec". No se escribe código hasta que una persona la apruebe."* Explicar que no es la IA "portándose bien": es un script que corre antes de cada edición.

### 4.4 Especificar
```
/sdd:spec
```
- Trabaja el subagente **analista-specs**. Mostrar que aparece como subagente en el panel.
- Abrir `spec.md`: reglas de negocio, tabla de escenarios `CA-08.1`, `CA-08.2`…, contrato de API, preguntas abiertas (como mucho tres, cada una con una propuesta).
- Discutir con la clase las preguntas abiertas. Las que salieron en el ensayo: *¿`pagaCon` es obligatorio en la API? ¿qué pasa con los pedidos viejos que no lo tienen? ¿hay un monto máximo?* Ninguna está en la tarjeta: aparecen recién cuando alguien intenta escribir la spec. Ese es el punto de SDD.
- Si hace falta, editar `spec.md` a mano frente a ellos. **La spec es de las personas.**

### 4.5 Aprobar (la puerta humana)
```
/sdd:aprobar Luis
```
Este comando tiene `disable-model-invocation: true`: Claude no puede aprobarse a sí mismo. Mostrar el frontmatter cambiado a `estado: aprobada`.

### 4.6 Planificar y partir en tareas
```
/sdd:plan
/sdd:tareas
```
- `plan.md` (subagente **arquitecto**): archivos a tocar, cambios de contrato, qué test cubre cada escenario, decisiones con la alternativa descartada.
- `tareas.md`: tareas chicas con `[CA-xx]` y tabla de cobertura. Preguntar a la clase: *¿hay algún escenario sin tarea?*

### 4.7 Implementar
```
/sdd:implementar
```
- Subagente **desarrollador**: test primero (falla), código, `npm run check`, marca `[x]`.
- Mientras trabaja, ir abriendo `api/test/` para ver los tests con nombre `CA-08.x`.
- Si tarda, se puede implementar por partes: `/sdd:implementar T1-T3`.

### 4.8 Verificar
```
/sdd:verificar
```
- Subagente **revisor-qa**, que no vio la implementación: corre `npm run check`, arma la matriz escenario → test → resultado y da el veredicto.
- Probar en el navegador: pedido de $8.500, pagar con $10.000 → vuelto $1.500. Probar un monto menor → mensaje de error.
- Mover la tarjeta F2.2 a **Hecho** en Trello (o pedirle a Claude que lo haga si tiene el conector).

---

## 5. Demo en vivo · Feature 2: F3.1 Lista de pedidos del local (20 min)

Ahora la versión "de corrido", para mostrar que el flujo es repetible:

```
npm run demo-pedidos        # en otra terminal: carga 3 pedidos de ejemplo
```
```
/sdd:todo F3.1
```
- El comando orquesta todo el pipeline y **se frena solo** después de la spec, esperando la aprobación.
- Revisar con la clase los escenarios: qué estados se muestran, en qué orden, qué devuelve `GET /api/pedidos`.
- `/sdd:aprobar` y decirle "seguí".
- Al terminar: abrir http://localhost:5173/local y ver los pedidos de ejemplo. Hacer un pedido nuevo desde el menú y recargar `/local`.

Pregunta para la clase: *si F2.2 ya estaba hecha, ¿la lista debería mostrar el vuelto? ¿Lo pide la tarjeta?* (No lo pide. Si el local lo quiere, es otra historia para el backlog, no algo que el desarrollador agrega "porque ya estaba".)

---

## 6. Si sobra tiempo: F3.2 Avanzar el estado (15 min)
```
/sdd:todo F3.2
```
Buen ejemplo de regla de negocio con error: avanzar un pedido ENTREGADO devuelve 409. Ver cómo el analista arma los escenarios de cada transición.

**F3.3 Seguimiento** queda como ejercicio para los grupos.

---

## 7. Cierre (10 min)

Preguntas para discutir:
1. ¿En qué paso se tomaron las decisiones importantes? (En la spec y en la aprobación, no en el código.)
2. ¿Qué hubiera pasado si le pedíamos "hacé el panel del local" sin spec?
3. ¿Qué parte del pipeline harían ustedes y qué parte delegarían?
4. ¿Por qué el revisor de QA es otro subagente y no el mismo que programó?

**Conexión con el TP:** cada grupo va a usar este mismo `.claude/` con su propio tablero (cambiando `sdd.config.json`) para implementar dos historias de su backlog del TP2.

---

## Machete de comandos

| Qué | Comando |
|---|---|
| Ver backlog | `/sdd:backlog` · `node scripts/trello-leer.mjs --listar` |
| Leer una feature | `/sdd:leer F2.2` · `npm run leer-feature -- F2.2` |
| Leer sin internet | `/sdd:leer F2.2 --offline` |
| Pipeline paso a paso | `/sdd:spec` → `/sdd:aprobar` → `/sdd:plan` → `/sdd:tareas` → `/sdd:implementar` → `/sdd:verificar` |
| Pipeline de corrido | `/sdd:todo F3.1` |
| Ver agentes / skills cargados | `/agents` · `/skills` |
| Tests y tipos | `npm run check` |
| Pedidos de ejemplo | `npm run demo-pedidos` |
| Base a cero | `npm run reset-db` |
| Apagar la guardia | vaciar `specs/ACTIVA` |

## Problemas frecuentes

| Síntoma | Solución |
|---|---|
| Claude pide permiso para todo | No se aceptó la confianza de la carpeta. Cerrar y abrir la sesión de Claude Code y aceptar. |
| `/sdd:leer` falla por red | Agregar `--offline` (usa `backlog/trello-snapshot.json`). |
| "No pudimos cargar el menú" | La API no está corriendo: `npm run dev`. |
| El hook bloquea algo que no debería | Revisar `specs/ACTIVA`. Vaciarlo desactiva la guardia. |
| Los comandos `/sdd:` no aparecen | Abrir VS Code en la carpeta raíz `comanda/` (donde está `.claude/`). |
