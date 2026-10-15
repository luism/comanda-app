import { describe, expect, it } from 'vitest';
import { appDePrueba } from './helpers.js';

describe('F1.1 · Ver el menú', () => {
  it('HU-01: lista solo productos disponibles con nombre, descripción y precio', async () => {
    const res = await appDePrueba().get('/api/productos');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.every((p: { disponible: boolean }) => p.disponible)).toBe(true);
    expect(res.body[0]).toMatchObject({ nombre: expect.any(String), descripcion: expect.any(String), precio: expect.any(Number) });
  });

  it('HU-01: un producto no disponible no aparece', async () => {
    const res = await appDePrueba().get('/api/productos');
    expect(res.body.find((p: { nombre: string }) => p.nombre === 'Calabresa')).toBeUndefined();
  });

  it('HU-02: filtra por categoría', async () => {
    const res = await appDePrueba().get('/api/productos?categoria=Bebidas');
    expect(res.body.length).toBe(2);
    expect(res.body.every((p: { categoria: string }) => p.categoria === 'Bebidas')).toBe(true);
  });
});
