import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Folder, Edit, History } from 'lucide-react';
import CreateSurface from './CreateSurface';
import ModifySurfaceModal from './modals/ModifySurfaceModal';
import SurfaceHistoryModal from './modals/SurfaceHistoryModal';

const Surfaces = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [modifyModal, setModifyModal] = useState({ isOpen: false, surface: null });
  const [historyModal, setHistoryModal] = useState({ isOpen: false, surface: null });
  const [surfaces, setSurfaces] = useState([
    {
      id: 1,
      name: 'Parcelle Nord',
      area: 8.5,
      location: 'Secteur Kindia - Route de Mamou',
      soilType: 'Limoneux',
      status: 'Cultivée',
      lastCrop: 'Pommes de terre'
    },
    {
      id: 2,
      name: 'Parcelle Sud',
      area: 12.3,
      location: 'Secteur Forécariah - Chemin de Boffa',
      soilType: 'Argilo-limoneux',
      status: 'En repos',
      lastCrop: 'Légumes'
    },
    {
      id: 3,
      name: 'Parcelle Est',
      area: 6.2,
      location: 'Secteur Dubréka - Près du village',
      soilType: 'Sableux',
      status: 'Cultivée',
      lastCrop: 'Pommes de terre'
    }
  ]);

  const handleSaveSurface = (newSurface: any) => {
    setSurfaces([...surfaces, newSurface]);
  };

  const handleModify = (surface: any) => {
    setModifyModal({ isOpen: true, surface });
  };

  const handleHistory = (surface: any) => {
    setHistoryModal({ isOpen: true, surface });
  };

  const handleSaveModifiedSurface = (updatedSurface: any) => {
    setSurfaces(surfaces.map(surface => 
      surface.id === updatedSurface.id ? updatedSurface : surface
    ));
  };

  if (showCreate) {
    return (
      <CreateSurface 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveSurface}
      />
    );
  }

  const getStatusBadge = (status: string) => {
    if (status === 'Cultivée') {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          {status}
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Surfaces agricoles</h1>
          <p className="text-gray-600 mt-1">Gestion de vos parcelles et terrains</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle surface
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">27.0 ha</p>
              <p className="text-sm text-green-600">Surface totale</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">3</p>
              <p className="text-sm text-blue-600">Parcelles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">2</p>
              <p className="text-sm text-amber-600">En culture</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Surfaces List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {surfaces.map((surface) => (
          <Card key={surface.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
            <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Folder className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-green-800">{surface.name}</CardTitle>
                    <CardDescription className="text-green-600">{surface.location}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(surface.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Superficie</p>
                    <p className="text-lg font-semibold text-green-700">{surface.area} ha</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Type de sol</p>
                    <p className="text-lg font-semibold text-blue-700">{surface.soilType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Dernière culture</p>
                  <p className="text-sm text-amber-700 font-medium">{surface.lastCrop}</p>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => handleModify(surface)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleHistory(surface)}
                  >
                    <History className="h-4 w-4 mr-1" />
                    Historique
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ModifySurfaceModal
        isOpen={modifyModal.isOpen}
        onClose={() => setModifyModal({ isOpen: false, surface: null })}
        surface={modifyModal.surface}
        onSave={handleSaveModifiedSurface}
      />

      <SurfaceHistoryModal
        isOpen={historyModal.isOpen}
        onClose={() => setHistoryModal({ isOpen: false, surface: null })}
        surface={historyModal.surface}
      />
    </div>
  );
};

export default Surfaces;
