
import { useState } from 'react';
import CreateClient from './CreateClient';

const ClientsPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [clients, setClients] = useState([]);

  const handleSaveClient = (newClient: any) => {
    setClients([...clients, newClient]);
  };

  if (showCreate) {
    return (
      <CreateClient 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveClient}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Gestion de votre clientèle</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Nouveau client
        </button>
      </div>
      
      <div>
        {/* Liste des clients */}
        <p className="text-gray-500">Aucun client pour le moment</p>
      </div>
    </div>
  );
};

export default ClientsPage;
