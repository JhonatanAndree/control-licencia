export interface Cliente {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  celular: string;
  email: string;
  fechaInicio: string;
  mesesContratados: number;
  fechaCaducidad: string;
  costoTotal: number;
}

export interface EstadisticasGenerales {
  totalClientes: number;
  gananciaTotal: number;
}