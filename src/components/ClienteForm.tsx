import React, { useState, useEffect } from 'react';
import { Cliente } from '../types';

interface ClienteFormProps {
  onClienteAdd: (cliente: Cliente) => void;
  onClienteUpdate: (cliente: Cliente) => void;
  clienteEditando: Cliente | null;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ onClienteAdd, onClienteUpdate, clienteEditando }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombres: '',
    apellidos: '',
    dni: '',
    codigoPais: '+51',
    celular: '',
    email: '',
    mesesContratados: 1,
    fechaInicio: '',
    fechaCaducidad: '',
    costoTotal: 0
  });

  useEffect(() => {
    if (clienteEditando) {
      const [codigoPais, celular] = clienteEditando.celular.split(' ');
      setFormData({ ...clienteEditando, codigoPais, celular });
    } else {
      resetForm();
    }
  }, [clienteEditando]);

  const resetForm = () => {
    setFormData({
      id: '',
      nombres: '',
      apellidos: '',
      dni: '',
      codigoPais: '+51',
      celular: '',
      email: '',
      mesesContratados: 1,
      fechaInicio: '',
      fechaCaducidad: '',
      costoTotal: 0
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fechaInicio = formData.fechaInicio || new Date().toISOString().split('T')[0];
    const fechaCaducidad = new Date(new Date(fechaInicio).setMonth(new Date(fechaInicio).getMonth() + Number(formData.mesesContratados))).toISOString().split('T')[0];
    const costoTotal = Number(formData.mesesContratados) * 4;

    const clienteData: Cliente = {
      ...formData,
      celular: `${formData.codigoPais} ${formData.celular}`,
      fechaInicio,
      fechaCaducidad,
      costoTotal,
      id: formData.id || crypto.randomUUID()
    };

    if (clienteEditando) {
      onClienteUpdate(clienteData);
    } else {
      onClienteAdd(clienteData);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombres</label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
        <input
          type="text"
          id="dni"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Celular</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <select
            id="codigoPais"
            name="codigoPais"
            value={formData.codigoPais}
            onChange={handleChange}
            className="rounded-l-md border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
          >
            <option value="+51">+51</option>
            {/* Agregar más opciones de códigos de país si es necesario */}
          </select>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            className="flex-1 rounded-r-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="999999999"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="mesesContratados" className="block text-sm font-medium text-gray-700">Meses contratados</label>
        <input
          type="number"
          id="mesesContratados"
          name="mesesContratados"
          value={formData.mesesContratados}
          onChange={handleChange}
          min="1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {clienteEditando ? 'Actualizar Cliente' : 'Registrar Cliente'}
      </button>
    </form>
  );
};

export default ClienteForm;