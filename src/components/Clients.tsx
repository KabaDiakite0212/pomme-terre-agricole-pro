
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Phone, MapPin } from 'lucide-react';
import CreateClient from './CreateClient';

const Clients = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Restaurant Le Palmier',
      contact: 'Mamadou Diallo',
      phone: '+224 621 234 567',
      address: 'Conakry, Kaloum',
      totalPurchases: 45600000,
      currentDebt: 8500000,
      status: 'Dette en cours',
      lastPurchase: '2024-05-20'
    },
    {
      id: 2,
      name: 'Marché Central',
      contact: 'Fatoumata Camara',
      phone: '+224 664 789 123',
      address: 'Kindia Centre',
      totalPurchases: 32000000,
      currentDebt: 0,
      status: 'À jour',
      lastPurchase: '2024-05-25'
    },
    {
      id: 3,
      name: 'Hôtel Riviera',
      contact: 'Ibrahima Sow',
      phone: '+224 622 456 789',
      address: 'Conakry, Dixinn',
      totalPurchases: 28500000,
      currentDebt: 3200000,
      status: 'Dette récente',
      lastPurchase: '2024-06-01'
    }
  ]);

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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'À jour':
        return {
          badgeClass: 'bg-green-100 text-green-800 hover:bg-green-200',
          bgColor: 'bg-gradient-to-r from-green-50 to-green-100',
          borderColor: 'border-l-4 border-green-500'
        };
      case 'Dette récente':
        return {
          badgeClass: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
          bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100',
          borderColor: 'border-l-4 border-amber-500'
        };
      case 'Dette en cours':
        return {
          badgeClass: 'bg-red-100 text-red-800 hover:bg-red-200',
          bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
          borderColor: 'border-l-4 border-red-500'
        };
      default:
        return {
          badgeClass: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
          bgColor: 'bg-gradient-to-r from-gray-50 to-gray-100',
          borderColor: 'border-l-4 border-gray-500'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Gestion de votre clientèle</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">3</p>
              <p className="text-sm text-blue-600">Clients actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">106,100,000 GNF</p>
              <p className="text-sm text-green-600">Total des ventes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">11,700,000 GNF</p>
              <p className="text-sm text-amber-600">Dettes en cours</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">2</p>
              <p className="text-sm text-purple-600">Avec dettes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => {
          const statusInfo = getStatusInfo(client.status);
          return (
            <Card key={client.id} className={`hover:shadow-lg transition-shadow duration-300 ${statusInfo.borderColor}`}>
              <CardHeader className={statusInfo.bgColor}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">{client.name}</CardTitle>
                      <CardDescription className="text-gray-600">{client.contact}</CardDescription>
                    </div>
                  </div>
                  <Badge className={statusInfo.badgeClass}>
                    {client.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{client.address}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Total achats</p>
                      <p className="font-medium text-green-700">{client.totalPurchases.toLocaleString()} GNF</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dette actuelle</p>
                      <p className={`font-medium ${client.currentDebt > 0 ? 'text-red-700' : 'text-green-700'}`}>
                        {client.currentDebt.toLocaleString()} GNF
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm">Dernier achat</p>
                    <p className="font-medium text-sm">{new Date(client.lastPurchase).toLocaleDateString('fr-FR')}</p>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 border-green-300 text-green-700 hover:bg-green-50">
                      Nouvelle vente
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50">
                      Historique
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Clients;
