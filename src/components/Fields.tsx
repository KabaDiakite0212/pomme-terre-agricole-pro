
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar } from 'lucide-react';

const Fields = () => {
  const [fields, setFields] = useState([
    {
      id: 1,
      name: 'Champ A1',
      surface: 'Parcelle Nord',
      variety: 'Charlotte',
      plantDate: '2024-03-15',
      density: '35,000 plants/ha',
      stage: 'Prêt à récolter',
      progress: 95,
      area: 4.2
    },
    {
      id: 2,
      name: 'Champ B2',
      surface: 'Parcelle Sud',
      variety: 'Bintje',
      plantDate: '2024-03-25',
      density: '38,000 plants/ha',
      stage: 'Croissance',
      progress: 70,
      area: 5.8
    },
    {
      id: 3,
      name: 'Champ C3',
      surface: 'Parcelle Est',
      variety: 'Désirée',
      plantDate: '2024-04-02',
      density: '32,000 plants/ha',
      stage: 'Jeune plant',
      progress: 40,
      area: 3.1
    }
  ]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prêt à récolter': return 'bg-green-500';
      case 'Croissance': return 'bg-amber-500';
      case 'Jeune plant': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Champs de pommes de terre</h1>
          <p className="text-gray-600 mt-1">Suivi de vos cultures en cours</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau champ
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">13.1 ha</p>
              <p className="text-sm text-gray-600">Surface cultivée</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-600">Champs actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">3</p>
              <p className="text-sm text-gray-600">Variétés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">1</p>
              <p className="text-sm text-gray-600">Prêt à récolter</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fields.map((field) => (
          <Card key={field.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{field.name}</CardTitle>
                    <CardDescription>{field.surface} • {field.area} ha</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{field.stage}</span>
                    <span className="text-sm text-gray-500">{field.progress}%</span>
                  </div>
                  <Progress value={field.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Variété</p>
                    <p className="font-medium">{field.variety}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Plantation</p>
                    <p className="font-medium">{new Date(field.plantDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm">Densité de semis</p>
                  <p className="font-medium text-sm">{field.density}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Actions
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

export default Fields;
