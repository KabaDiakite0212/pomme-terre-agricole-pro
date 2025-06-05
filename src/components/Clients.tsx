
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, History } from 'lucide-react';
import CreateClient from './CreateClient';

const Clients = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Restaurant Le Jardin',
      type: 'Restaurant',
      contact: '+224 620 123 456',
      email: 'contact@lejardin.gn',
      location: 'Kaloum, Conakry',
      totalPurchases: 45000000,
      lastOrder: '2024-05-20',
      status: 'Actif',
      creditLimit: 10000000
    },
    {
      id: 2,
      name: 'Supermarché Central',
      type: 'Supermarché',
      contact: '+224 625 789 012',
      email: 'achats@supercentral.gn',
      location: 'Matam, Conakry',
      totalPurchases: 78000000,
      lastOrder: '2024-05-18',
      status: 'Actif',
      creditLimit: 25000000
    },
    {
      id: 3,
      name: 'Coopérative Locale Kindia',
      type: 'Coopérative',
      contact: '+224 654 321 987',
      email: 'coop.kindia@gmail.com',
      location: 'Centre-ville, Kindia',
      totalPurchases: 32000000,
      lastOrder: '2024-05-15',
      status: 'Actif',
      creditLimit: 15000000
    },
    {
      id: 4,
      name: 'Marché Madina',
      type: 'Grossiste',
      contact: '+224 664 555 777',
      email: 'marche.madina@yahoo.fr',
      location: 'Madina, Conakry',
      totalPurchases: 23000000,
      lastOrder: '2024-04-30',
      status: 'Inactif',
      creditLimit: 5000000
    }
  ]);

  const handleSaveClient = (newClient: any) => {
    setClients([...clients, newClient]);
  };

  const handleHistory = (clientId: number) => {
    alert(`Historique du client ${clientId}`);
  };

  if (showCreate) {
    return (
      <CreateClient 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveClient}
      />
    );
  }

  const getClientTypeBadge = (type: string) => {
    switch (type) {
      case 'Restaurant': 
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{type}</Badge>;
      case 'Supermarché': 
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{type}</Badge>;
      case 'Coopérative': 
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{type}</Badge>;
      case 'Grossiste': 
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{type}</Badge>;
      default: 
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Actif') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
  };

  const getClientStats = () => {
    const activeClients = clients.filter(client => client.status === 'Actif').length;
    const totalRevenue = clients.reduce((sum, client) => sum + client.totalPurchases, 0);
    const totalCreditLimit = clients.reduce((sum, client) => sum + client.creditLimit, 0);
    
    return { activeClients, totalRevenue, totalCreditLimit };
  };

  const stats = getClientStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Gestion de votre portefeuille client</p>
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
              <p className="text-2xl font-bold text-blue-700">{clients.length}</p>
              <p className="text-sm text-blue-600">Total clients</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{stats.activeClients}</p>
              <p className="text-sm text-green-600">Clients actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">{stats.totalRevenue.toLocaleString()} GNF</p>
              <p className="text-sm text-purple-600">CA total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">{stats.totalCreditLimit.toLocaleString()} GNF</p>
              <p className="text-sm text-amber-600">Crédit total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-blue-800">{client.name}</CardTitle>
                    <CardDescription className="text-blue-600">{client.location}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  {getClientTypeBadge(client.type)}
                  {getStatusBadge(client.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact</p>
                    <p className="text-sm font-medium text-blue-700">{client.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-sm font-medium text-blue-700">{client.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CA total</p>
                    <p className="text-lg font-semibold text-green-700">{client.totalPurchases.toLocaleString()} GNF</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Limite crédit</p>
                    <p className="text-lg font-semibold text-amber-700">{client.creditLimit.toLocaleString()} GNF</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Dernière commande</p>
                  <p className="text-sm font-medium text-purple-700">{new Date(client.lastOrder).toLocaleDateString('fr-FR')}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleHistory(client.id)}
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
    </div>
  );
};

export default Clients;
