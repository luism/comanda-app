import { crearApp } from './app.js';
import { crearStoreEnArchivo } from './repositories/store.js';

const PORT = Number(process.env.PORT ?? 3001);
const DATA_FILE = process.env.DATA_FILE ?? 'data/db.json';

crearApp(crearStoreEnArchivo(DATA_FILE)).listen(PORT, () => {
  console.log(`API de Comanda en http://localhost:${PORT}  (datos en api/${DATA_FILE})`);
});
