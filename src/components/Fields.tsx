import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar, Eye, Settings } from 'lucide-react';
import CreateField from './CreateField';
import FieldDetailsModal from './modals/FieldDetailsModal';
import FieldActionsModal from './modals/FieldActionsModal';

const Fields = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  
  const [fields, setFields] = useState([
    {
      id: 1,
      name: 'Champ A1',
      surface: 'Parcelle Nord',
      variety: 'Gros calibre',
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
      variety: 'Petit calibre (25-35mm)',
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
      variety: 'Calibre moyen',
      plantDate: '2024-04-02',
      density: '32,000 plants/ha',
      stage: 'Jeune plant',
      progress: 40,
      area: 3.1
    }
  ]);

  const handleSaveField = (newField: any) => {
    setFields([...fields, newField]);
  };

  const handleDetails = (field: any) => {
    setSelectedField(field);
    setShowDetailsModal(true);
  };

  const handleActions = (field: any) => {
    setSelectedField(field);
    setShowActionsModal(true);
  };

  if (showCreate) {
    return (
      <CreateField 
        onBack={() => setShowCreate(false)} 
        onSave={handleSaveField}
      />
    );
  }

  const getStageInfo = (stage: string, progress: number) => {
    if (stage === 'Prêt à récolter') {
      return {
        bgColor: 'bg-gradient-to-r from-green-50 to-green-100',
        textColor: 'text-green-800',
        progressColor: 'bg-green-500',
        borderColor: 'border-l-4 border-green-500'
      };
    }
    if (stage === 'Croissance') {
      return {
        bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100',
        textColor: 'text-amber-800',
        progressColor: 'bg-amber-500',
        borderColor: 'border-l-4 border-amber-500'
      };
    }
    return {
      bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100',
      textColor: 'text-blue-800',
      progressColor: 'bg-blue-500',
      borderColor: 'border-l-4 border-blue-500'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Champs de pommes de terre</h1>
          <p className="text-gray-600 mt-1">Suivi de vos cultures en cours</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau champ
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">13.1 ha</p>
              <p className="text-sm text-green-600">Surface cultivée</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">3</p>
              <p className="text-sm text-blue-600">Champs actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-700">3</p>
              <p className="text-sm text-amber-600">Calibres</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">1</p>
              <p className="text-sm text-purple-600">Prêt à récolter</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fields.map((field) => {
          const stageInfo = getStageInfo(field.stage, field.progress);
          return (
            <Card key={field.id} className={`hover:shadow-lg transition-shadow duration-300 ${stageInfo.borderColor}`}>
              <CardHeader className={stageInfo.bgColor}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${stageInfo.textColor}`}>{field.name}</CardTitle>
                      <CardDescription className={stageInfo.textColor}>{field.surface} • {field.area} ha</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${stageInfo.textColor}`}>{field.stage}</span>
                      <span className="text-sm text-gray-500">{field.progress}%</span>
                    </div>
                    <Progress 
                      value={field.progress} 
                      className="h-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Calibre</p>
                      <p className={`font-medium ${stageInfo.textColor}`}>{field.variety}</p>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                      onClick={() => handleDetails(field)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => handleActions(field)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Actions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <FieldDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        field={selectedField}
      />

      <FieldActionsModal
        isOpen={showActionsModal}
        onClose={() => setShowActionsModal(false)}
        field={selectedField}
      />
    </div>
  );
};

export default Fields;
