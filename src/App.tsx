import React, { useState, useEffect } from 'react';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import Estadisticas from './components/Estadisticas';
import AlertBell from './components/AlertBell';
import AlertModal from './components/AlertModal';
import { Cliente, EstadisticasGenerales } from './types';
import { Users } from 'lucide-react';

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [clientesProximosAVencer, setClientesProximosAVencer] = useState<Cliente[]>([]);

  useEffect(() => {
    const hoy = new Date();
    const enCuatroDias = new Date(hoy.getTime() + 4 * 24 * 60 * 60 * 1000);
    const proximosAVencer = clientes.filter(cliente => {
      const fechaCaducidad = new Date(cliente.fechaCaducidad);
      return fechaCaducidad > hoy && fechaCaducidad <= enCuatroDias;
    });
    setClientesProximosAVencer(proximosAVencer);
  }, [clientes]);

  const handleClienteAdd = (nuevoCliente: Cliente) => {
    setClientes([...clientes, nuevoCliente]);
  };

  const handleClienteUpdate = (clienteActualizado: Cliente) => {
    setClientes(clientes.map(cliente => 
      cliente.id === clienteActualizado.id ? clienteActualizado : cliente
    ));
    setClienteEditando(null);
  };

  const handleClienteDelete = (id: string) => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  const handleEditClick = (cliente: Cliente) => {
    setClienteEditando(cliente);
  };

  const calcularEstadisticas = (): EstadisticasGenerales => {
    return {
      totalClientes: clientes.length,
      gananciaTotal: clientes.reduce((total, cliente) => total + cliente.costoTotal, 0),
    };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Administración de Licencias Canva</h1>
          </div>
          <AlertBell 
            alertCount={clientesProximosAVencer.length} 
            onClick={() => setShowAlertModal(true)} 
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                {clienteEditando ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
              </h2>
              <ClienteForm 
                onClienteAdd={handleClienteAdd} 
                onClienteUpdate={handleClienteUpdate}
                clienteEditando={clienteEditando}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Estadisticas estadisticas={calcularEstadisticas()} />
            <div className="mt-6 bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Lista de Clientes</h2>
              <ClienteList 
                clientes={clientes} 
                onDelete={handleClienteDelete}
                onEdit={handleEditClick}
              />
            </div>
          </div>
        </div>
      </main>
      <AlertModal 
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        clientesProximosAVencer={clientesProximosAVencer}
      />
    </div>
  );
}

export default App;