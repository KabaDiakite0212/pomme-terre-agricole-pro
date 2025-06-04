
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Database } from 'lucide-react';
import CreateInput from './CreateInput';

const Inputs = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: 'Engrais NPK 15-15-15',
      category: 'Engrais',
      stock: 25,
      unit: 'sacs 50kg',
      alertLevel: 10,
      totalValue: 2500000,
      lastPurchase: '2024-02-15'
    },
    {
      id: 2,
      name: 'Semences Charlotte',
      category: 'Semences',
      stock: 180,
      unit: 'kg',
      alertLevel: 50,
      totalValue: 720000,
      lastPurchase: '2024-01-20'
    },
    {
      id: 3,
      name: 'Fongicide Cuivre',
      category: 'Phytosanitaire',
      stock: 8,
      unit: 'litres',
      alertLevel: 5,
      totalValue: 320000,
      lastPurchase: '2024-03-10'
    },
    {
      id: 4,
      name: 'Fiente de poule',
      category: 'Amendement',
      stock: 120,
      unit: 'tonnes',
      alertLevel: 20,
      totalValue: 4800000,
      lastPurchase: '2024-01-05'
    }
  ]);

  const handleSaveInput = (newInput: any) => {
    setInputs([...inputs, newInput]);
  };

  if (showCreate) {
    return (
      <CreateInput 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveInput}
      />
    );
  }

  const getStockLevel = (stock: number, alertLevel: number) => {
    const ratio = stock / (alertLevel * 2);
    if (ratio <= 0.5) return { level: 'Critique', color: 'bg-red-500', percentage: ratio * 100 };
    if (ratio <= 1) return { level: 'Faible', color: 'bg-amber-500', percentage: ratio * 100 };
    return { level: 'Bon', color: 'bg-green-500', percentage: Math.min(ratio * 100, 100) };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Engrais': return 'bg-green-100 text-green-800';
      case 'Semences': return 'bg-blue-100 text-blue-800';
      case 'Phytosanitaire': return 'bg-red-100 text-red-800';
      case 'Amendement': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intrants & Stocks</h1>
          <p className="text-gray-600 mt-1">Gestion de vos intrants agricoles</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel intrant
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8,340,000 GNF</p>
              <p className="text-sm text-gray-600">Valeur totale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-gray-600">Types d'intrants</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">2</p>
              <p className="text-sm text-gray-600">Stocks faibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">1</p>
              <p className="text-sm text-gray-600">Alert critique</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {inputs.map((input) => {
          const stockInfo = getStockLevel(input.stock, input.alertLevel);
          return (
            <Card key={input.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{input.name}</CardTitle>
                      <CardDescription>
                        <Badge className={getCategoryColor(input.category)} variant="secondary">
                          {input.category}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Stock actuel</span>
                      <Badge variant={stockInfo.level === 'Critique' ? 'destructive' : 
                                   stockInfo.level === 'Faible' ? 'secondary' : 'default'}>
                        {stockInfo.level}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-lg font-bold">{input.stock} {input.unit}</span>
                      <span className="text-sm text-gray-500">
                        Seuil: {input.alertLevel} {input.unit}
                      </span>
                    </div>
                    <Progress value={stockInfo.percentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Valeur totale</p>
                      <p className="font-medium">{input.totalValue.toLocaleString()} GNF</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dernier achat</p>
                      <p className="font-medium">{new Date(input.lastPurchase).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Utiliser
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Acheter
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

export default Inputs;
