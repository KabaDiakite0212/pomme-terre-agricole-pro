
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Grid, Layers, MapPin, User, Calendar } from 'lucide-react';

const ConservationOverview = () => {
  // Données mockées pour l'exemple
  const stats = {
    totalCases: 12,
    totalTapis: 48,
    totalLignes: 192,
    conservationsActives: 28,
    capaciteUtilisee: 75,
    quantiteTotale: 15420
  };

  const recentConservations = [
    {
      id: 1,
      paysan: 'Amadou Diallo',
      datelivraison: '2024-06-05',
      quantiteSemence: 500,
      quantiteConsomable: 1200,
      typeConservation: 'Consomable',
      emplacement: 'Case A1 - Tapis 2 - Ligne 3'
    },
    {
      id: 2,
      paysan: 'Fatou Kaba',
      datelivraison: '2024-06-04',
      quantiteSemence: 300,
      quantiteConsomable: 800,
      typeConservation: 'Semence',
      emplacement: 'Case B2 - Tapis 1 - Ligne 5'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Grid className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
            <p className="text-xs text-gray-600">Espaces de stockage principaux</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tapis</CardTitle>
            <Layers className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTapis}</div>
            <p className="text-xs text-gray-600">Sections de stockage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lignes</CardTitle>
            <MapPin className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLignes}</div>
            <p className="text-xs text-gray-600">Emplacements de sacs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conservations Actives</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conservationsActives}</div>
            <p className="text-xs text-gray-600">En cours de stockage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacité Utilisée</CardTitle>
            <div className="h-4 w-4 bg-red-600 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.capaciteUtilisee}%</div>
            <p className="text-xs text-gray-600">De l'espace total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quantité Totale</CardTitle>
            <Package className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quantiteTotale.toLocaleString()}</div>
            <p className="text-xs text-gray-600">kg stockés</p>
          </CardContent>
        </Card>
      </div>

      {/* Conservations récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Conservations Récentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentConservations.map((conservation) => (
              <div key={conservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{conservation.paysan}</span>
                  </div>
                  <Badge variant={conservation.typeConservation === 'Consomable' ? 'default' : 'secondary'}>
                    {conservation.typeConservation}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {conservation.quantiteSemence + conservation.quantiteConsomable} kg
                  </div>
                  <div className="text-xs text-gray-500">{conservation.datelivraison}</div>
                  <div className="text-xs text-blue-600">{conservation.emplacement}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConservationOverview;
