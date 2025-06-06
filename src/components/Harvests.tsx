import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, ShoppingCart, Edit, Loader2 } from 'lucide-react';
import { useHarvests } from '@/hooks/useHarvests';
import CreateHarvest from './CreateHarvest';
import SellHarvestModal from './modals/SellHarvestModal';
import ModifyHarvestModal from './modals/ModifyHarvestModal';

const Harvests = () => {
  const { data: harvests = [], isLoading, error } = useHarvests();
  const [showCreate, setShowCreate] = useState(false);
  const [sellModal, setSellModal] = useState({ isOpen: false, harvest: null });
  const [modifyModal, setModifyModal] = useState({ isOpen: false, harvest: null });

  const handleSaveHarvest = () => {
    // React Query will automatically refetch when we invalidate the query
    setShowCreate(false);
  };

  const handleSell = (harvest: any) => {
    setSellModal({ isOpen: true, harvest });
  };

  const handleSellConfirm = () => {
    // React Query will handle the data refresh automatically
    setSellModal({ isOpen: false, harvest: null });
  };

  const handleModify = (harvest: any) => {
    setModifyModal({ isOpen: true, harvest });
  };

  const handleModifyConfirm = () => {
    // React Query will handle the data refresh automatically
    setModifyModal({ isOpen: false, harvest: null });
  };

  if (showCreate) {
    return (
      <CreateHarvest 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveHarvest}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Chargement des récoltes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erreur lors du chargement des récoltes</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellente': return 'bg-green-100 text-green-800';
      case 'Bonne': return 'bg-blue-100 text-blue-800';
      case 'Moyenne': return 'bg-amber-100 text-amber-800';
      case 'Médiocre': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalStats = () => {
    const totalHarvested = harvests.reduce((sum, harvest) => sum + (harvest.quantity || 0), 0);
    const totalValue = harvests.reduce((sum, harvest) => sum + (harvest.totalValue || 0), 0);
    const totalSold = harvests.reduce((sum, harvest) => sum + (harvest.sold || 0), 0);
    const totalStock = harvests.reduce((sum, harvest) => sum + (harvest.inStock || 0), 0);
    
    return { totalHarvested, totalValue, totalSold, totalStock };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Récoltes & Stock</h1>
          <p className="text-gray-600 mt-1">Gestion de vos récoltes et stocks</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle récolte
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.totalHarvested.toLocaleString()} kg</p>
              <p className="text-sm text-gray-600">Total récolté</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.totalStock.toLocaleString()} kg</p>
              <p className="text-sm text-gray-600">En stock</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{stats.totalSold.toLocaleString()} kg</p>
              <p className="text-sm text-gray-600">Déjà vendu</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.totalValue.toLocaleString()} GNF</p>
              <p className="text-sm text-gray-600">Valeur totale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Harvests List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {harvests.map((harvest) => (
          <Card key={harvest.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{harvest.fieldName}</CardTitle>
                    <CardDescription>{harvest.variety} • {new Date(harvest.harvestDate).toLocaleDateString('fr-FR')}</CardDescription>
                  </div>
                </div>
                <Badge className={getQualityColor(harvest.quality)} variant="secondary">
                  {harvest.quality}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Quantité récoltée</p>
                    <p className="font-bold text-lg">{(harvest.quantity || 0).toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Valeur totale</p>
                    <p className="font-bold text-lg text-green-600">{(harvest.totalValue || 0).toLocaleString()} GNF</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Vendu</p>
                    <p className="font-medium text-blue-600">{(harvest.sold || 0).toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-600">En stock</p>
                    <p className="font-medium text-amber-600">{(harvest.inStock || 0).toLocaleString()} kg</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm">Lieu de stockage</p>
                  <p className="font-medium">{harvest.storageLocation}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => handleSell(harvest)}
                    disabled={(harvest.inStock || 0) === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Vendre
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleModify(harvest)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SellHarvestModal
        isOpen={sellModal.isOpen}
        onClose={() => setSellModal({ isOpen: false, harvest: null })}
        harvest={sellModal.harvest}
        onSell={handleSellConfirm}
      />

      <ModifyHarvestModal
        isOpen={modifyModal.isOpen}
        onClose={() => setModifyModal({ isOpen: false, harvest: null })}
        harvest={modifyModal.harvest}
        onModify={handleModifyConfirm}
      />
    </div>
  );
};

export default Harvests;
