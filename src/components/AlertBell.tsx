import React from 'react';
import { Bell } from 'lucide-react';

interface AlertBellProps {
  alertCount: number;
  onClick: () => void;
}

const AlertBell: React.FC<AlertBellProps> = ({ alertCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span className="sr-only">Ver alertas</span>
      <Bell className="h-6 w-6" />
      {alertCount > 0 && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
      )}
    </button>
  );
};

export default AlertBell;