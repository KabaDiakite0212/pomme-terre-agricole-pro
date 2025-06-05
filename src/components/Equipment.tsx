
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Wrench, Edit, Trash2 } from 'lucide-react';
import CreateEquipment from './CreateEquipment';

const Equipment = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      name: 'Tracteur John Deere 5050E',
      type: 'Tracteur',
      status: 'Opérationnel',
      acquisitionDate: '2023-06-15',
      lastMaintenance: '2024-05-10',
      nextMaintenance: '2024-08-10',
      value: 25000000,
      description: 'Tracteur 50 CV pour labour et préparation du sol'
    },
    {
      id: 2,
      name: 'Motopompe Honda WB30X',
      type: 'Irrigation',
      status: 'En maintenance',
      acquisitionDate: '2023-03-20',
      lastMaintenance: '2024-05-20',
      nextMaintenance: '2024-06-20',
      value: 2500000,
      description: 'Motopompe pour irrigation des cultures'
    },
    {
      id: 3,
      name: 'Charrue réversible 3 socs',
      type: 'Labour',
      status: 'Opérationnel',
      acquisitionDate: '2023-06-15',
      lastMaintenance: '2024-04-15',
      nextMaintenance: '2024-10-15',
      value: 1800000,
      description: 'Charrue pour retournement du sol'
    }
  ]);

  const handleSaveEquipment = (newEquipment: any) => {
    setEquipment([...equipment, newEquipment]);
  };

  if (showCreate) {
    return (
      <CreateEquipment 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveEquipment}
      />
    );
  }

  const getStatusBadge = (status: string) => {
    if (status === 'Opérationnel') {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          {status}
        </Badge>
      );
    }
    if (status === 'En maintenance') {
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          {status}
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
        {status}
      </Badge>
    );
  };

  const totalValue = equipment.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Équipements & Matériels</h1>
          <p className="text-gray-600 mt-1">Gestion de vos équipements agricoles</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel équipement
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{equipment.length}</p>
              <p className="text-sm text-blue-600">Équipements</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">
                {equipment.filter(e => e.status === 'Opérationnel').length}
              </p>
              <p className="text-sm text-green-600">Opérationnels</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">
                {equipment.filter(e => e.status === 'En maintenance').length}
              </p>
              <p className="text-sm text-amber-600">En maintenance</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">
                {Math.round(totalValue / 1000000)}M GNF
              </p>
              <p className="text-sm text-purple-600">Valeur totale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {equipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-blue-800">{item.name}</CardTitle>
                    <CardDescription className="text-blue-600">{item.type}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Valeur</p>
                    <p className="text-lg font-semibold text-green-700">
                      {item.value.toLocaleString()} GNF
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Acquisition</p>
                    <p className="text-sm text-gray-800">
                      {new Date(item.acquisitionDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dernière maintenance</p>
                    <p className="text-sm text-gray-800">
                      {new Date(item.lastMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Prochaine maintenance</p>
                    <p className="text-sm text-amber-700 font-medium">
                      {new Date(item.nextMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
