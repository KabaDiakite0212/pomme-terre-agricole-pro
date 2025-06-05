
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Sprout, Target, Activity } from 'lucide-react';

interface FieldDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: any;
}

const FieldDetailsModal = ({ isOpen, onClose, field }: FieldDetailsModalProps) => {
  if (!field) return null;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prêt à récolter':
        return 'bg-green-100 text-green-800';
      case 'Croissance':
        return 'bg-amber-100 text-amber-800';
      case 'Jeune plant':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span>Détails - {field.name}</span>
          </DialogTitle>
          <DialogDescription>
            Informations complètes du champ de pommes de terre
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* En-tête avec statut */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">{field.name}</h3>
                <p className="text-green-600">{field.surface} • {field.area} ha</p>
              </div>
              <Badge className={getStageColor(field.stage)}>
                {field.stage}
              </Badge>
            </div>
          </div>

          {/* Informations générales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Surface agricole</p>
                  <p className="font-medium">{field.surface}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Target className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Superficie</p>
                  <p className="font-medium">{field.area} hectares</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Date de plantation</p>
                  <p className="font-medium">{new Date(field.plantDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Sprout className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Densité de semis</p>
                  <p className="font-medium">{field.density}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de culture */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-blue-600" />
              Informations de culture
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Calibre des pommes de terre</p>
                  <p className="font-medium text-blue-800">{field.variety}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progression</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${field.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{field.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques estimées */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Estimations</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(field.area * 25)} tonnes
                </p>
                <p className="text-sm text-blue-700">Rendement estimé</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((100 - field.progress) * 0.5)} jours
                </p>
                <p className="text-sm text-green-700">Jusqu'à récolte</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">
                  {Math.round(field.area * 25 * 20000).toLocaleString()} GNF
                </p>
                <p className="text-sm text-amber-700">Valeur estimée</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FieldDetailsModal;
