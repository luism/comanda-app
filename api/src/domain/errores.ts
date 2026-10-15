// Error de negocio con código HTTP. El middleware de errores lo traduce a JSON.
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly detalles?: unknown,
  ) {
    super(message);
  }
}

export const badRequest = (msg: string, detalles?: unknown) => new HttpError(400, msg, detalles);
export const notFound = (msg: string) => new HttpError(404, msg);
export const conflict = (msg: string) => new HttpError(409, msg);
