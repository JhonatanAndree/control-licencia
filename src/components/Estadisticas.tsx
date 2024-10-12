import React from 'react';
import { EstadisticasGenerales } from '../types';

interface EstadisticasProps {
  estadisticas: EstadisticasGenerales;
}

const Estadisticas: React.FC<EstadisticasProps> = ({ estadisticas }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Estadísticas Generales</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Total de Clientes</p>
          <p className="text-2xl font-bold">{estadisticas.totalClientes}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Ganancias Totales</p>
          <p className="text-2xl font-bold">{estadisticas.gananciaTotal} soles</p>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;