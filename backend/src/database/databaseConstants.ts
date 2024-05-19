export const modelsFilesRoutes =
  '../features/**/infrastructure/models/*.dto.ts';
export const initializedDbMessage = 'Data Source has been initialized';
export const initializedDbErrorMessage = 'Data Source initialization error';

export enum defautlDbConfig {
  postgres = 'postgres',
  host = 'tu_host',
  port = 5432,
  username = 'tu_usuario',
  password = 'tu_contraseña'
}
