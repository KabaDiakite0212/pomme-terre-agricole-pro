
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatsCard from './StatsCard';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre exploitation</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Nouvelle activité
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Surfaces totales"
          value="24.5 ha"
          description="3 parcelles"
          trend="+2.1% vs saison dernière"
          color="bg-green-500"
        />
        <StatsCard
          title="Champs actifs"
          value="8"
          description="Pommes de terre"
          trend="2 prêts à récolter"
          color="bg-amber-500"
        />
        <StatsCard
          title="Revenus YTD"
          value="€45,680"
          description="Ventes réalisées"
          trend="+12% vs objectif"
          color="bg-blue-500"
        />
        <StatsCard
          title="Clients actifs"
          value="23"
          description="4 nouvelles dettes"
          trend="€3,200 en attente"
          color="bg-purple-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Champs en cours */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Champs en cours</CardTitle>
            <CardDescription>État des cultures actuelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Parcelle A1 - Charlotte</p>
                  <p className="text-sm text-gray-600">Planté le 15 mars</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Prêt à récolter</p>
                  <Progress value={95} className="w-20 mt-1" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium">Parcelle B2 - Bintje</p>
                  <p className="text-sm text-gray-600">Planté le 25 mars</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-amber-600">En croissance</p>
                  <Progress value={70} className="w-20 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Parcelle C3 - Désirée</p>
                  <p className="text-sm text-gray-600">Planté le 2 avril</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">Jeune plant</p>
                  <Progress value={40} className="w-20 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertes et actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-800">Alertes & Actions</CardTitle>
            <CardDescription>Actions prioritaires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <div className="flex-1">
                  <p className="font-medium text-red-800">Traitement urgent</p>
                  <p className="text-sm text-red-600">Parcelle A1 - Mildiou détecté</p>
                </div>
                <Button size="sm" variant="destructive">Action</Button>
              </div>

              <div className="flex items-center p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                <div className="flex-1">
                  <p className="font-medium text-amber-800">Paiement en retard</p>
                  <p className="text-sm text-amber-600">Client Martin - €850</p>
                </div>
                <Button size="sm" variant="outline">Relancer</Button>
              </div>

              <div className="flex items-center p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <div className="flex-1">
                  <p className="font-medium text-blue-800">Stock faible</p>
                  <p className="text-sm text-blue-600">Engrais NPK - 2 sacs restants</p>
                </div>
                <Button size="sm" variant="outline">Commander</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activités récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Récolte Parcelle A1 - 2.8 tonnes</span>
              </div>
              <span className="text-sm text-gray-500">Il y a 2 heures</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Vente à Restaurant Le Jardin - €1,200</span>
              </div>
              <span className="text-sm text-gray-500">Hier</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Traitement fongicide Parcelle B2</span>
              </div>
              <span className="text-sm text-gray-500">Il y a 3 jours</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
