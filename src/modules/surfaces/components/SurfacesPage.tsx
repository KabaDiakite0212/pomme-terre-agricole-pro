
import { useState } from 'react';
import CreateSurface from './CreateSurface';

const SurfacesPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [surfaces, setSurfaces] = useState([]);

  const handleSaveSurface = (newSurface: any) => {
    setSurfaces([...surfaces, newSurface]);
  };

  if (showCreate) {
    return (
      <CreateSurface 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveSurface}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Surfaces agricoles</h1>
          <p className="text-gray-600 mt-1">Gestion de vos parcelles</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Nouvelle surface
        </button>
      </div>
      
      <div>
        {/* Liste des surfaces */}
        <p className="text-gray-500">Aucune surface pour le moment</p>
      </div>
    </div>
  );
};

export default SurfacesPage;
