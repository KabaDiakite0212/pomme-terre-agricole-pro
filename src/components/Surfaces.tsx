
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Folder, Edit, History, Loader2 } from 'lucide-react';
import CreateSurface from './CreateSurface';
import ModifySurfaceModal from './modals/ModifySurfaceModal';
import SurfaceHistoryModal from './modals/SurfaceHistoryModal';
import { useSurfaces, Surface } from '@/hooks/useSurfaces';

const Surfaces = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [modifyModal, setModifyModal] = useState<{ isOpen: boolean; surface: Surface | null }>({ isOpen: false, surface: null });
  const [historyModal, setHistoryModal] = useState<{ isOpen: boolean; surface: Surface | null }>({ isOpen: false, surface: null });
  
  const { data: surfaces = [], isLoading, error } = useSurfaces();

  const handleModify = (surface: Surface) => {
    setModifyModal({ isOpen: true, surface });
  };

  const handleHistory = (surface: Surface) => {
    setHistoryModal({ isOpen: true, surface });
  };

  if (showCreate) {
    return (
      <CreateSurface 
        onBack={() => setShowCreate(false)} 
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

  const totalArea = surfaces.reduce((acc, surface) => acc + surface.size, 0);
  const surfacesInCulture = surfaces.filter(surface => surface.status === 'Cultivée').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des surfaces...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Erreur lors du chargement des surfaces</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-green-700">{totalArea.toFixed(1)} ha</p>
              <p className="text-sm text-green-600">Surface totale</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{surfaces.length}</p>
              <p className="text-sm text-blue-600">Parcelles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">{surfacesInCulture}</p>
              <p className="text-sm text-amber-600">En culture</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Surfaces List */}
      {surfaces.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <p className="text-gray-500 mb-4">Aucune surface agricole créée</p>
            <Button onClick={() => setShowCreate(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer votre première surface
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {surfaces.map((surface) => (
            <Card key={surface._id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
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
                      <p className="text-lg font-semibold text-green-700">{surface.size} ha</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Type de sol</p>
                      <p className="text-lg font-semibold text-blue-700">{surface.soilType}</p>
                    </div>
                  </div>
                  {surface.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Description</p>
                      <p className="text-sm text-gray-700">{surface.description}</p>
                    </div>
                  )}
                  {surface.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Notes</p>
                      <p className="text-sm text-amber-700">{surface.notes}</p>
                    </div>
                  )}
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
      )}

      <ModifySurfaceModal
        isOpen={modifyModal.isOpen}
        onClose={() => setModifyModal({ isOpen: false, surface: null })}
        surface={modifyModal.surface}
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
