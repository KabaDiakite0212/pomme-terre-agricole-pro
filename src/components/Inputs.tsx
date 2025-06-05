
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
      name: 'Semences calibre moyen',
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
    if (ratio <= 0.5) return { 
      level: 'Critique', 
      color: 'bg-red-500', 
      percentage: ratio * 100,
      bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
      borderColor: 'border-l-4 border-red-500'
    };
    if (ratio <= 1) return { 
      level: 'Faible', 
      color: 'bg-amber-500', 
      percentage: ratio * 100,
      bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100',
      borderColor: 'border-l-4 border-amber-500'
    };
    return { 
      level: 'Bon', 
      color: 'bg-green-500', 
      percentage: Math.min(ratio * 100, 100),
      bgColor: 'bg-gradient-to-r from-green-50 to-green-100',
      borderColor: 'border-l-4 border-green-500'
    };
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Engrais': 
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{category}</Badge>;
      case 'Semences': 
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{category}</Badge>;
      case 'Phytosanitaire': 
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{category}</Badge>;
      case 'Amendement': 
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{category}</Badge>;
      default: 
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{category}</Badge>;
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
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">8,340,000 GNF</p>
              <p className="text-sm text-green-600">Valeur totale</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">4</p>
              <p className="text-sm text-blue-600">Types d'intrants</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">2</p>
              <p className="text-sm text-amber-600">Stocks faibles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-700">1</p>
              <p className="text-sm text-red-600">Alert critique</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {inputs.map((input) => {
          const stockInfo = getStockLevel(input.stock, input.alertLevel);
          return (
            <Card key={input.id} className={`hover:shadow-lg transition-shadow duration-300 ${stockInfo.borderColor}`}>
              <CardHeader className={stockInfo.bgColor}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">{input.name}</CardTitle>
                      <CardDescription>
                        {getCategoryBadge(input.category)}
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
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${stockInfo.color}`}
                        style={{ width: `${Math.min(stockInfo.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Valeur totale</p>
                      <p className="font-medium text-green-700">{input.totalValue.toLocaleString()} GNF</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dernier achat</p>
                      <p className="font-medium">{new Date(input.lastPurchase).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 border-green-300 text-green-700 hover:bg-green-50">
                      Utiliser
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50">
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
