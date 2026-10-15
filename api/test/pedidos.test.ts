import { describe, expect, it } from 'vitest';
import { appDePrueba, clienteValido } from './helpers.js';

describe('F2.1 · Datos de entrega y confirmación', () => {
  it('HU-07: crea el pedido en RECIBIDO con número y total calculado por el servidor', async () => {
    const res = await appDePrueba()
      .post('/api/pedidos')
      .send({ cliente: clienteValido, items: [{ productoId: 1, cantidad: 1 }, { productoId: 5, cantidad: 6 }] });
    expect(res.status).toBe(201);
    expect(res.body.estado).toBe('RECIBIDO');
    expect(res.body.numero).toBe(1001);
    expect(res.body.total).toBe(8500 + 1200 * 6);
  });

  it('HU-07: ignora precios enviados por el navegador', async () => {
    const res = await appDePrueba()
      .post('/api/pedidos')
      .send({ cliente: clienteValido, items: [{ productoId: 1, cantidad: 1, precio: 1 }], total: 1 });
    expect(res.body.total).toBe(8500);
  });

  it('HU-07: rechaza productos inexistentes o no disponibles', async () => {
    const app = appDePrueba();
    expect((await app.post('/api/pedidos').send({ cliente: clienteValido, items: [{ productoId: 999, cantidad: 1 }] })).status).toBe(400);
    expect((await appDePrueba().post('/api/pedidos').send({ cliente: clienteValido, items: [{ productoId: 4, cantidad: 1 }] })).status).toBe(400);
  });

  it('HU-06: rechaza datos de entrega vacíos', async () => {
    const res = await appDePrueba()
      .post('/api/pedidos')
      .send({ cliente: { nombre: '', telefono: '', direccion: '' }, items: [{ productoId: 1, cantidad: 1 }] });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toHaveProperty('cliente');
  });

  it('HU-06: rechaza teléfonos con letras o cortos', async () => {
    for (const telefono of ['38155ABC', '1234']) {
      const res = await appDePrueba()
        .post('/api/pedidos')
        .send({ cliente: { ...clienteValido, telefono }, items: [{ productoId: 1, cantidad: 1 }] });
      expect(res.status).toBe(400);
    }
  });

  it('GET /api/pedidos/:id devuelve el pedido o 404', async () => {
    const app = appDePrueba();
    const creado = await app.post('/api/pedidos').send({ cliente: clienteValido, items: [{ productoId: 2, cantidad: 2 }] });
    const res = await app.get(`/api/pedidos/${creado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.numero).toBe(creado.body.numero);
    expect((await app.get('/api/pedidos/no-existe')).status).toBe(404);
  });
});
