import React from 'react';
import { Cliente } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface ClienteListProps {
  clientes: Cliente[];
  onDelete: (id: string) => void;
  onEdit: (cliente: Cliente) => void;
}

const ClienteList: React.FC<ClienteListProps> = ({ clientes, onDelete, onEdit }) => {
  const getWhatsAppLink = (numero: string) => {
    // Eliminar cualquier carácter que no sea dígito o el signo +
    const numeroLimpio = numero.replace(/[^\d+]/g, '');
    return `https://wa.me/${numeroLimpio}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Caducidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.nombres}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.apellidos}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.dni}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={getWhatsAppLink(cliente.celular)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {cliente.celular}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.fechaInicio}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.fechaCaducidad}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cliente.costoTotal} soles</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(cliente)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(cliente.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;