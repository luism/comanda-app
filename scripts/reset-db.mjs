// Borra la base JSON de la API. Al reiniciar la API se crea de nuevo con el menú inicial.
import { rmSync } from 'node:fs'
rmSync(new URL('../api/data/db.json', import.meta.url), { force: true })
console.log('Base borrada. Reiniciá la API (npm run dev) para empezar de cero.')
