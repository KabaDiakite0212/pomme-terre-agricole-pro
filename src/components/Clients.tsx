
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Restaurant Le Jardin',
      contact: 'Jean Martin',
      phone: '03 28 45 67 89',
      email: 'contact@lejardin.fr',
      totalPurchases: 12500,
      debt: 0,
      status: 'Actif',
      lastOrder: '2024-05-20'
    },
    {
      id: 2,
      name: 'Supermarché Delhaize',
      contact: 'Marie Dubois',
      phone: '03 28 56 78 90',
      email: 'marie.dubois@delhaize.be',
      totalPurchases: 8900,
      debt: 850,
      status: 'Dette',
      lastOrder: '2024-05-15'
    },
    {
      id: 3,
      name: 'Coopérative Locale',
      contact: 'Pierre Lefebvre',
      phone: '03 28 67 89 01',
      email: 'p.lefebvre@coop-locale.fr',
      totalPurchases: 15600,
      debt: 0,
      status: 'Actif',
      lastOrder: '2024-05-22'
    },
    {
      id: 4,
      name: 'Ferme Biologique Nord',
      contact: 'Sophie Bernard',
      phone: '03 28 78 90 12',
      email: 'sophie@ferme-bio-nord.fr',
      totalPurchases: 4200,
      debt: 320,
      status: 'Dette',
      lastOrder: '2024-05-10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'default';
      case 'Dette': return 'destructive';
      case 'Inactif': return 'secondary';
      default: return 'secondary';
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
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">€41,200</p>
              <p className="text-sm text-gray-600">CA total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-gray-600">Clients actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">€1,170</p>
              <p className="text-sm text-gray-600">Dettes totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-gray-600">En retard</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.contact}</CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CA total</p>
                    <p className="text-lg font-semibold text-green-600">€{client.totalPurchases.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dette actuelle</p>
                    <p className={`text-lg font-semibold ${client.debt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      €{client.debt}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Téléphone:</span>
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="truncate ml-2">{client.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dernière commande:</span>
                    <span>{new Date(client.lastOrder).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Contacter
                  </Button>
                  {client.debt > 0 && (
                    <Button variant="destructive" size="sm" className="flex-1">
                      Relancer
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
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
