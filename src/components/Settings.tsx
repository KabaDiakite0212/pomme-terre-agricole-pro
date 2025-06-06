
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const [storageLocations, setStorageLocations] = useState([
    'Entrepôt Principal',
    'Entrepôt Nord',
    'Entrepôt Sud',
    'Chambre froide'
  ]);

  const [productTypes] = useState([
    { name: 'Petit calibre (25-35 mm)', description: 'Pommes de terre de petit calibre' },
    { name: 'Calibre moyen (35-45 mm)', description: 'Pommes de terre de calibre moyen' },
    { name: 'Gros calibre (45-55 mm)', description: 'Pommes de terre de gros calibre' }
  ]);

  const [newStorageLocation, setNewStorageLocation] = useState('');

  const handleAddStorageLocation = () => {
    if (newStorageLocation.trim() && !storageLocations.includes(newStorageLocation.trim())) {
      setStorageLocations([...storageLocations, newStorageLocation.trim()]);
      setNewStorageLocation('');
    }
  };

  const handleRemoveStorageLocation = (location: string) => {
    setStorageLocations(storageLocations.filter(loc => loc !== location));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Gérez les modules et configurations de l'application</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <SettingsIcon className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      {/* Storage Locations Management */}
      <Card>
        <CardHeader>
          <CardTitle>Lieux de stockage</CardTitle>
          <CardDescription>
            Gérez les lieux de stockage disponibles pour les récoltes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="newLocation">Ajouter un nouveau lieu</Label>
              <Input
                id="newLocation"
                value={newStorageLocation}
                onChange={(e) => setNewStorageLocation(e.target.value)}
                placeholder="Ex: Entrepôt Est"
                onKeyPress={(e) => e.key === 'Enter' && handleAddStorageLocation()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddStorageLocation} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Lieux existants</Label>
            <div className="flex flex-wrap gap-2">
              {storageLocations.map((location, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2">
                  {location}
                  <button
                    onClick={() => handleRemoveStorageLocation(location)}
                    className="hover:bg-red-100 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Types */}
      <Card>
        <CardHeader>
          <CardTitle>Types de produits</CardTitle>
          <CardDescription>
            Calibres de pommes de terre disponibles pour les ventes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productTypes.map((product, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <Badge variant="outline" className="mt-2">
                  Type standard
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Les types de produits sont standardisés selon les calibres de pommes de terre. 
              Ces catégories sont optimisées pour le marché guinéen.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
          <CardDescription>
            Configuration générale de l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium">Devise</Label>
              <p className="text-lg">Franc Guinéen (GNF)</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Région</Label>
              <p className="text-lg">Guinée</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Version</Label>
              <p className="text-lg">1.0.0</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Dernière mise à jour</Label>
              <p className="text-lg">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
